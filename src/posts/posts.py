import os
import yaml
import json
import datetime
import jdatetime  # Install via "pip install jdatetime"
from collections import defaultdict, OrderedDict

def convert_numbers_to_persian(text):
    """
    Converts English digits in a string to their Persian equivalents.
    """
    mapping = {
        '0': '۰',
        '1': '۱',
        '2': '۲',
        '3': '۳',
        '4': '۴',
        '5': '۵',
        '6': '۶',
        '7': '۷',
        '8': '۸',
        '9': '۹',
    }
    for en_digit, fa_digit in mapping.items():
        text = text.replace(en_digit, fa_digit)
    return text

def get_sort_key(post):
    """
    Returns a datetime object for sorting based on the createdAt field.
    If createdAt is missing or cannot be parsed, returns datetime.datetime.min.
    """
    created_at = post.get('createdAt')
    if created_at:
        if isinstance(created_at, str):
            try:
                return datetime.datetime.strptime(created_at, "%Y-%m-%d")
            except Exception as e:
                print(f"Error parsing createdAt: {e}")
                return datetime.datetime.min
        elif isinstance(created_at, datetime.date):
            return datetime.datetime.combine(created_at, datetime.time.min)
        else:
            return created_at
    return datetime.datetime.min

def process_markdown_file(filepath):
    """
    Reads a Markdown file and extracts its YAML front matter and content.
    Returns an OrderedDict with all properties.
    
    It processes and adds derived time properties.
    For createdAt:
       - formattedCreatedAt (full English date, e.g., "November 19, 2023")
       - formattedCreatedAtMonthDay (only month and day, e.g., "November 19")
       - faFormatedCreatedAt (Jalali full date with Persian digits)
       - faFormattedCreatedAtMonthDay (Jalali month & day with Persian digits)
       - faYear (Jalali year with Persian digits)
    
    For lastModified:
       - formattedLastModified (full English date)
       - faFormatedLastModified (Jalali full date with Persian digits)
    
    These derived keys are inserted immediately after the lastModified key.
    """
    with open(filepath, 'r', encoding='utf-8') as file:
        text = file.read()
        
    parts = text.split('---')
    if len(parts) >= 3:
        front_matter = parts[1]
        content = '---'.join(parts[2:]).strip()
        metadata = yaml.safe_load(front_matter) or {}
    else:
        metadata = {}
        content = text.strip()
        
    metadata['content'] = content

    # --- Process createdAt properties ---
    if 'createdAt' in metadata:
        created_at = metadata.get('createdAt')
        dt_created = None
        if created_at:
            if isinstance(created_at, str):
                try:
                    dt_created = datetime.datetime.strptime(created_at, "%Y-%m-%d")
                except Exception as e:
                    print(f"Error parsing createdAt in {filepath}: {e}")
            else:
                dt_created = created_at
        if dt_created:
            # English full date and month+day
            metadata['formattedCreatedAt'] = dt_created.strftime("%B %d, %Y")
            metadata['formattedCreatedAtMonthDay'] = dt_created.strftime("%B %d")
            g_created = dt_created.date() if isinstance(dt_created, datetime.datetime) else dt_created
            j_date_created = jdatetime.date.fromgregorian(date=g_created)
            metadata['faFormatedCreatedAt'] = convert_numbers_to_persian(j_date_created.strftime("%d %B %Y"))
            metadata['faFormattedCreatedAtMonthDay'] = convert_numbers_to_persian(j_date_created.strftime("%d %B"))
            metadata['faYear'] = convert_numbers_to_persian(j_date_created.strftime("%Y"))
    
    # --- Process lastModified properties ---
    if 'lastModified' in metadata:
        last_modified = metadata.get('lastModified')
        dt_last = None
        if last_modified:
            if isinstance(last_modified, str):
                try:
                    dt_last = datetime.datetime.strptime(last_modified, "%Y-%m-%d")
                except Exception as e:
                    print(f"Error parsing lastModified in {filepath}: {e}")
            else:
                dt_last = last_modified
        if dt_last:
            metadata['formattedLastModified'] = dt_last.strftime("%B %d, %Y")
            g_last = dt_last.date() if isinstance(dt_last, datetime.datetime) else dt_last
            j_date_last = jdatetime.date.fromgregorian(date=g_last)
            metadata['faFormatedLastModified'] = convert_numbers_to_persian(j_date_last.strftime("%d %B %Y"))
    
    # --- Reorder metadata: insert derived keys immediately after lastModified.
    derived_keys = {
        'formattedCreatedAt', 'formattedCreatedAtMonthDay', 'faFormatedCreatedAt', 
        'faFormattedCreatedAtMonthDay', 'faYear',
        'formattedLastModified', 'faFormatedLastModified'
    }
    new_metadata = OrderedDict()
    remaining_keys = [k for k in metadata if k not in derived_keys]
    for key in remaining_keys:
        new_metadata[key] = metadata[key]
        if key == 'lastModified':
            if 'formattedCreatedAt' in metadata:
                new_metadata['formattedCreatedAt'] = metadata['formattedCreatedAt']
            if 'formattedCreatedAtMonthDay' in metadata:
                new_metadata['formattedCreatedAtMonthDay'] = metadata['formattedCreatedAtMonthDay']
            if 'faFormatedCreatedAt' in metadata:
                new_metadata['faFormatedCreatedAt'] = metadata['faFormatedCreatedAt']
            if 'faFormattedCreatedAtMonthDay' in metadata:
                new_metadata['faFormattedCreatedAtMonthDay'] = metadata['faFormattedCreatedAtMonthDay']
            if 'faYear' in metadata:
                new_metadata['faYear'] = metadata['faYear']
            if 'formattedLastModified' in metadata:
                new_metadata['formattedLastModified'] = metadata['formattedLastModified']
            if 'faFormatedLastModified' in metadata:
                new_metadata['faFormatedLastModified'] = metadata['faFormatedLastModified']
    for key in remaining_keys:
        if key not in new_metadata:
            new_metadata[key] = metadata[key]
    
    return new_metadata

def process_language_directory(language_path):
    """
    Processes a language directory (e.g., "en" or "fa") where posts are organized
    in subfolders by year. Within each year, posts are sorted from new to old 
    (based on createdAt). Returns an OrderedDict with years (as folder names)
    sorted descending (newer years first) and each value is a list of posts.
    """
    posts_by_year = {}
    for subfolder in sorted(os.listdir(language_path)):
        full_subfolder_path = os.path.join(language_path, subfolder)
        if os.path.isdir(full_subfolder_path):
            posts = []
            for filename in sorted(os.listdir(full_subfolder_path)):
                if filename.endswith('.md'):
                    filepath = os.path.join(full_subfolder_path, filename)
                    print(f"Processing: {filepath}")
                    post_data = process_markdown_file(filepath)
                    posts.append(post_data)
            # Sort posts (new to old) within this year using createdAt
            posts.sort(key=get_sort_key, reverse=True)
            posts_by_year[subfolder] = posts
    # Sort the year keys descending (assuming folder names are numeric years)
    sorted_years = sorted(posts_by_year.keys(), key=lambda x: int(x), reverse=True)
    ordered = OrderedDict()
    for year in sorted_years:
        ordered[year] = posts_by_year[year]
    return ordered

def to_js_object(value, indent=0):
    """
    Recursively converts Python data into nicely formatted JavaScript object/array literals.
    Keys that are numeric or valid JavaScript identifiers are output unquoted.
    """
    ind = "  " * indent
    if isinstance(value, dict):
        items = []
        for k, v in value.items():
            if isinstance(k, str):
                if k.isnumeric() or k.isidentifier():
                    js_key = k
                else:
                    js_key = f'"{k}"'
            else:
                js_key = str(k)
            items.append(f"{ind}  {js_key}: {to_js_object(v, indent+1)}")
        return "{\n" + ",\n".join(items) + f"\n{ind}}}"
    elif isinstance(value, list):
        items = [f"{ind}  {to_js_object(item, indent+1)}" for item in value]
        return "[\n" + ",\n".join(items) + f"\n{ind}]"
    elif isinstance(value, (datetime.date, datetime.datetime)):
        return f'"{value.isoformat()}"'
    else:
        return json.dumps(value, ensure_ascii=False)

def to_js_object_inner(value, indent=0):
    """
    Helper for converting tag objects into JavaScript literals.
    """
    ind = "  " * indent
    if isinstance(value, dict):
        items = []
        for k, v in value.items():
            if isinstance(k, str):
                if k.isnumeric() or k.isidentifier():
                    js_key = k
                else:
                    js_key = f'"{k}"'
            else:
                js_key = str(k)
            items.append(f"{ind}  {js_key}: {to_js_object_inner(v, indent+1)}")
        return "{\n" + ",\n".join(items) + f"\n{ind}}}"
    elif isinstance(value, list):
        items = [f"{ind}  {to_js_object_inner(item, indent+1)}" for item in value]
        return "[\n" + ",\n".join(items) + f"\n{ind}]"
    elif isinstance(value, str):
        return json.dumps(value, ensure_ascii=False)
    else:
        return str(value)

def write_posts_js(en_posts, fa_posts, output_path):
    """
    Writes the posts.js file containing two objects (enPosts and faPosts)
    grouped by year, along with a getAllPosts(locale) function.
    """
    en_posts_js = to_js_object(en_posts, indent=1)
    fa_posts_js = to_js_object(fa_posts, indent=1)
    
    js_content = f"""const enPosts = {en_posts_js};

const faPosts = {fa_posts_js};

export function getAllPosts(locale) {{
  if (locale === "en") {{
    return enPosts;
  }} else {{
    return faPosts;
  }}
}}
"""
    with open(output_path, 'w', encoding='utf-8') as f:
        f.write(js_content)
    print(f"Wrote posts.js to {output_path}")

def categorize_tags(tags, language):
    """
    Groups tags into categories based on their first character.
    For English, uses the uppercase first letter; for Persian, uses the first character.
    Each category is sorted alphabetically.
    """
    tag_categories = defaultdict(list)
    for tag in tags:
        if language == 'en':
            first_char = tag[0].upper() if tag and tag[0].isalpha() else tag[0]
        else:
            first_char = tag[0] if tag else ""
        tag_categories[first_char].append(tag)
    for key in tag_categories:
        tag_categories[key].sort()
    return dict(tag_categories)

def write_tags_js(en_tags, fa_tags, output_path):
    """
    Writes the tags.js file containing two objects (allEnTags and allFaTags)
    and the getAllTags(locale) function.
    """
    allEnTags_js = to_js_object_inner(en_tags, indent=1)
    allFaTags_js = to_js_object_inner(fa_tags, indent=1)
    
    js_content = f"""const allEnTags = {allEnTags_js};

const allFaTags = {allFaTags_js};

export function getAllTags(locale) {{
  if (locale === "en") {{
    return allEnTags;
  }} else {{
    return allFaTags;
  }}
}}
"""
    with open(output_path, 'w', encoding='utf-8') as f:
        f.write(js_content)
    print(f"Wrote tags.js to {output_path}")

if __name__ == "__main__":
    base_dir = '.'
    en_posts = {}
    fa_posts = {}
    en_tags_set = set()
    fa_tags_set = set()
    
    for lang in ['en', 'fa']:
        lang_dir = os.path.join(base_dir, lang)
        if not os.path.exists(lang_dir):
            print(f"Directory not found: {lang_dir}")
            continue
        posts_by_year = process_language_directory(lang_dir)
        if lang == 'en':
            en_posts = posts_by_year
            for year_posts in posts_by_year.values():
                for post in year_posts:
                    for tag in post.get('tags', []):
                        en_tags_set.add(tag)
        else:
            fa_posts = posts_by_year
            for year_posts in posts_by_year.values():
                for post in year_posts:
                    for tag in post.get('tags', []):
                        fa_tags_set.add(tag)
                        
    write_posts_js(en_posts, fa_posts, 'posts.js')
    
    en_tags_list = list(en_tags_set)
    fa_tags_list = list(fa_tags_set)
    
    categorized_en_tags = categorize_tags(en_tags_list, 'en')
    categorized_fa_tags = categorize_tags(fa_tags_list, 'fa')
    
    write_tags_js(categorized_en_tags, categorized_fa_tags, 'tags.js')