import { Link } from "@/i18n/routing";

export default function ArrangeTags({ allTags, notes }) {
  return (
    <>
      {Object.entries(allTags).map(([key, value]) => {
        return (
          <div key={key} className="mb-7">
            <h3 className="text-3xl font-bold text-neutral-800 dark:text-neutral-100 mb-1">
              {key.toUpperCase()}
            </h3>
            <div className="flex flex-wrap items-center gap-3">
              {value.map((tag) => {
                return (
                  <Link
                    key={tag}
                    href={notes ? `/tags/${tag}` : `/blog/code/tags/${tag}`}
                    className="text-sm font-medium py-1 px-3 bg-neutral-100/45 rounded-xl border-2 border-neutral-300 hover:border-rose-500 tracking-wider dark:bg-neutral-800 dark:text-neutral-300 dark:border-neutral-500 dark:hover:text-neutral-100 dark:hover:border-rose-300 active:scale-95 hover:visited:border-indigo-500 hover:dark:visited:border-indigo-300"
                  >
                    {tag}
                  </Link>
                );
              })}
            </div>
          </div>
        );
      })}
    </>
  );
}
