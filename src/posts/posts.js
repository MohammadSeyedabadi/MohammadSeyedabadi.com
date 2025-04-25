const enPosts = {
    2025: [
      {
        local: true,
        lang: "en",
        slug: "my-new-post",
        otherPageSlug: "پست-جدید",
        title: "My new post",
        createdAt: "2025-3-19",
        lastModified: "2025-3-19",
        formattedCreatedAt: "March 19, 2025",
        formattedCreatedAtMonthDay: "March 19",
        faFormatedCreatedAt: "۲۹ اسفند ۱۴۰۳",
        faFormattedCreatedAtMonthDay: "۲۹ اسفند",
        faYear: "۱۴۰۳",
        formattedLastModified: "March 19, 2025",
        faFormatedLastModified: "۲۹ اسفند ۱۴۰۳",
        image: "https://raw.githubusercontent.com/MohammadSeyedabadi/MohammadSeyedabadi.com/refs/heads/master/public/images/posts/how-to-create-a-multilevel-dropdown-menu-in-react/how-to-create-a-multilevel-dropdown-menu-in-react.png",
        excerpt: "Multilevel dropdown menus are a staple of web design. With the ability to provide multiple options to select from, they make navigation bars dynamic and organized.",
        tags: [
          "front-end",
          "algorithm",
          "reactjs",
          "soon"
        ],
        content: "This tutorial is a simplified version of [this tutorial](https://blog.logrocket.com/how-create-multilevel-dropdown-menu-react/) written by Ibadehin Mojeed.\nIf you want a complete explanation, you have to read his article. He also has another article where he explans\nhow to make dropdown menus with CSS. You could check that out [here.](https://blog.logrocket.com/making-dropdown-menus-css/) At the end we will have something like this:\n\n![Final-outcome-react-multilevel-dropdown-menu-project](https://raw.githubusercontent.com/MohammadSeyedabadi/MohammadSeyedabadi.com/refs/heads/master/public/images/posts/how-to-create-a-multilevel-dropdown-menu-in-react/img1-Final-outcome-react-multilevel-dropdown-menu-project.gif)\n\nSo let's start with our code. If you want to create a multilevel dropdown menu, one good way is\nto use recursive functions. As in [GeeksForGeeks](https://www.geeksforgeeks.org/recursive-functions/) explained:\n\n> A Recursive function can be defined as a routine that calls itself directly or indirectly. In other words, a recursive function is a function that solves a problem by solving smaller instances of the same problem. This technique is commonly used in programming to solve problems that can be broken down into simpler, similar subproblems.\n\nBasically a Recursive function is a function that calls it self, something like this:\n\n```js\n myRecursiveFunction(){\n    // some code\n    myRecursiveFunction()\n   // some code\n}\n```\n\nWell you may say that _**it causes an infinite loop.**_ That's right but not if we have a condition that stops the function call in a certain state, something like:\n\n```js\nmyRecursiveFunction(){\n   // some code\n   if(true){\n    return\n   }\n   myRecursiveFunction()\n   // some code\n}\n```\n\nAs you see, there is a MenuItems function inside of Header function, which is responsible for\ncreating submenus ( lis ) inside of our menus ( uls ), or maybe just single submenus ( lis ).\nOur MenuItems function is our recursive function, it calls itself indirectly by Dropdown function and\nthat **_items.submenu ?_** is its termination condition, if that condition is false, then it just simply creates a\nLink, but if that is true, then it will create a button( so the user can click or hover to see submenu/s )\nand then it calls itself by Dropdown function to again, create either a Link or a button.\n\nHere is the css code to make it feel more like a navigation:\n\n\n## Conclusion\n\nSo that was it for this tutorial. If you still didn't understand what a recursive function does, that's totally fine, because i explained it in short, so go ahead and google it :))"
      },
      {
        local: true,
        lang: "en",
        slug: "performance-tuning-in-sql-server",
        otherPageSlug: "پست-جدید",
        title: "Performance tuning in SQL server",
        createdAt: "2025-3-19",
        lastModified: "2025-3-19",
        formattedCreatedAt: "March 19, 2025",
        formattedCreatedAtMonthDay: "March 19",
        faFormatedCreatedAt: "۲۹ اسفند ۱۴۰۳",
        faFormattedCreatedAtMonthDay: "۲۹ اسفند",
        faYear: "۱۴۰۳",
        formattedLastModified: "March 19, 2025",
        faFormatedLastModified: "۲۹ اسفند ۱۴۰۳",
        image: "https://raw.githubusercontent.com/MohammadSeyedabadi/MohammadSeyedabadi.com/refs/heads/master/public/images/posts/how-to-create-a-multilevel-dropdown-menu-in-react/how-to-create-a-multilevel-dropdown-menu-in-react.png",
        excerpt: "Multilevel dropdown menus are a staple of web design. With the ability to provide multiple options to select from, they make navigation bars dynamic and organized.",
        tags: [
          "database"
        ],
        content: "some stuff about performance"
      }
    ],
    2023: [
      {
        local: true,
        lang: "en",
        slug: "how-to-create-a-multilevel-dropdown-menu-in-react",
        otherPageSlug: "نحوه-ایجاد-یک-منوی-چند-سطحی-در-ریکت",
        title: "How to create a multilevel dropdown menu in React",
        createdAt: "2023-11-19",
        lastModified: "2023-11-19",
        formattedCreatedAt: "November 19, 2023",
        formattedCreatedAtMonthDay: "November 19",
        faFormatedCreatedAt: "۲۸ آبان ۱۴۰۲",
        faFormattedCreatedAtMonthDay: "۲۸ آبان",
        faYear: "۱۴۰۲",
        formattedLastModified: "November 19, 2023",
        faFormatedLastModified: "۲۸ آبان ۱۴۰۲",
        image: "https://raw.githubusercontent.com/MohammadSeyedabadi/MohammadSeyedabadi.com/refs/heads/master/public/images/posts/how-to-create-a-multilevel-dropdown-menu-in-react/how-to-create-a-multilevel-dropdown-menu-in-react.png",
        excerpt: "Multilevel dropdown menus are a staple of web design. With the ability to provide multiple options to select from, they make navigation bars dynamic and organized.",
        tags: [
          "front-end",
          "algorithm",
          "reactjs"
        ],
        content: "This tutorial is a simplified version of [this tutorial](https://blog.logrocket.com/how-create-multilevel-dropdown-menu-react/) written by Ibadehin Mojeed.\nIf you want a complete explanation, you have to read his article. He also has another article where he explans\nhow to make dropdown menus with CSS. You could check that out [here.](https://blog.logrocket.com/making-dropdown-menus-css/) At the end we will have something like this:\n\n![Final-outcome-react-multilevel-dropdown-menu-project](https://raw.githubusercontent.com/MohammadSeyedabadi/MohammadSeyedabadi.com/refs/heads/master/public/images/posts/how-to-create-a-multilevel-dropdown-menu-in-react/img1-Final-outcome-react-multilevel-dropdown-menu-project.gif)\n\nSo let's start with our code. If you want to create a multilevel dropdown menu, one good way is\nto use recursive functions. As in [GeeksForGeeks](https://www.geeksforgeeks.org/recursive-functions/) explained:\n\n> A Recursive function can be defined as a routine that calls itself directly or indirectly. In other words, a recursive function is a function that solves a problem by solving smaller instances of the same problem. This technique is commonly used in programming to solve problems that can be broken down into simpler, similar subproblems.\n\nBasically a Recursive function is a function that calls it self, something like this:\n\n```js\n myRecursiveFunction(){\n    // some code\n    myRecursiveFunction()\n   // some code\n}\n```\n\nWell you may say that _**it causes an infinite loop.**_ That's right but not if we have a condition that stops the function call in a certain state, something like:\n\n```js\nmyRecursiveFunction(){\n   // some code\n   if(true){\n    return\n   }\n   myRecursiveFunction()\n   // some code\n}\n```\n\nIt is also good to know that any problems that you can solve using a recursive function, will always have an alternative looping solution, but most of the time a recursive function makes our life easier.\nSo in our case, imagine that we have an array of menus and submenus like this:\n\n```js\n[\n  {\n    title: \"Home\",\n    url: \"/\",\n  },\n  {\n    title: \"Services\",\n    url: \"/services\",\n    submenu: [\n      {\n        title: \"web design\",\n        url: \"web-design\",\n      },\n      {\n        title: \"web development\",\n        url: \"web-dev\",\n        submenu: [\n          {\n            title: \"Frontend\",\n            url: \"frontend\",\n          },\n          {\n            title: \"Backend\",\n            submenu: [\n              {\n                title: \"NodeJS\",\n                url: \"node\",\n              },\n              {\n                title: \"PHP\",\n                url: \"php\",\n              },\n            ],\n          },\n        ],\n      },\n      {\n        title: \"SEO\",\n        url: \"seo\",\n      },\n    ],\n  },\n  {\n    title: \"About\",\n    url: \"/about\",\n    submenu: [\n      {\n        title: \"Who we are\",\n        url: \"who-we-are\",\n      },\n      {\n        title: \"Our values\",\n        url: \"our-values\",\n      },\n    ],\n  },\n];\n```\n\nWe can write a function which is responsible for rendering our whole navigation, i called it Header just as Ibadehin Mojeed did,\nbecause our header tag which is inside of this function, wraps everything, but you could call it whatever you want. I also wrote a usestate for small screens.\n\n```jsx\nexport default function Header() {\n  const [toggle, setToggle] = useState(false);\n  return (\n    <header className={` ${toggle ? \"active\" : \"\"} `}>\n      <div className=\"nav-area\">\n        <Link href=\"/\" className=\"logo\">\n          logo\n        </Link>\n        {menuItems.length ? (\n          <>\n            <nav>\n              <ul className=\"menus\">\n                {menuItems.map((menu, index) => {\n                  const depthLevel = 0;\n                  return (\n                    <MenuItems\n                      items={menu}\n                      key={index}\n                      depthLevel={depthLevel}\n                    />\n                  );\n                })}\n              </ul>\n            </nav>\n            <div\n              className=\"menuToggle\"\n              onClick={() => setToggle(toggle === true ? false : true)}\n            ></div>\n          </>\n        ) : null}\n      </div>\n    </header>\n  );\n}\n\nfunction MenuItems({ items, depthLevel }) {\n  const [dropdown, setDropdown] = useState(false);\n\n  function onMouseEnter() {\n    window.innerWidth > 960 && setDropdown(true);\n  }\n\n  function onMouseLeave() {\n    window.innerWidth > 960 && setDropdown(false);\n  }\n\n  return (\n    <li\n      className=\"menu-items\"\n      onMouseEnter={onMouseEnter}\n      onMouseLeave={onMouseLeave}\n    >\n      {items.submenu ? (\n        <>\n          <button\n            type=\"button\"\n            aria-haspopup=\"menu\"\n            aria-expanded={dropdown ? \"true\" : \"false\"}\n            onClick={() => setDropdown((prev) => !prev)}\n          >\n            {items.title}{\" \"}\n            {depthLevel > 0 ? <span>&raquo;</span> : <span className=\"arrow\" />}\n          </button>\n          <Dropdown\n            depthLevel={depthLevel}\n            submenus={items.submenu}\n            dropdown={dropdown}\n          />\n        </>\n      ) : (\n        <Link href={items.url}>{items.title}</Link>\n      )}\n    </li>\n  );\n}\n\nfunction Dropdown({ depthLevel, submenus, dropdown }) {\n  depthLevel = depthLevel + 1;\n  const dropdownClass = depthLevel > 1 ? \"dropdown-submenu\" : \"\";\n\n  return (\n    <ul className={` dropdown ${dropdownClass} ${dropdown ? \"show\" : \"\"} `}>\n      {submenus.map((submenu, index) => (\n        <MenuItems items={submenu} key={index} depthLevel={depthLevel} />\n      ))}\n    </ul>\n  );\n}\n```\n\nAs you see, there is a MenuItems function inside of Header function, which is responsible for\ncreating submenus ( lis ) inside of our menus ( uls ), or maybe just single submenus ( lis ).\nOur MenuItems function is our recursive function, it calls itself indirectly by Dropdown function and\nthat **_items.submenu ?_** is its termination condition, if that condition is false, then it just simply creates a\nLink, but if that is true, then it will create a button( so the user can click or hover to see submenu/s )\nand then it calls itself by Dropdown function to again, create either a Link or a button.\n\nHere is the css code to make it feel more like a navigation:\n\n```css\n* {\n  margin: 0;\n  padding: 0;\n  box-sizing: border-box;\n}\n\nbody {\n  font-family: sans-serif;\n}\n\nheader {\n  box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.07), 0 1px 2px 0 rgba(0, 0, 0, 0.05);\n  color: #212529;\n}\n\n.nav-area {\n  display: flex;\n  align-items: center;\n  max-width: 1200px;\n  margin: 0 auto;\n  padding: 10px 20px;\n}\n\n.logo {\n  text-decoration: none;\n  font-size: 25px;\n  color: inherit;\n  margin-right: 20px;\n}\n\n.menus {\n  display: flex;\n  align-items: center;\n  flex-wrap: wrap;\n  list-style: none;\n}\n\n.menu-items {\n  position: relative;\n  font-size: 14px;\n}\n\n.menu-items a {\n  display: block;\n  font-size: inherit;\n  color: inherit;\n  text-decoration: none;\n}\n\n.menu-items button {\n  display: flex;\n  align-items: center;\n  color: inherit;\n  font-size: inherit;\n  border: none;\n  background-color: transparent;\n  cursor: pointer;\n  width: 100%;\n}\n\nbutton span {\n  margin-left: 3px;\n}\n\n.menu-items > a,\n.menu-items button {\n  text-align: left;\n  padding: 0.7rem 1rem;\n}\n\n.menu-items a:hover,\n.menu-items button:hover {\n  background-color: #f2f2f2;\n}\n\n.arrow::after {\n  content: \"\";\n  display: inline-block;\n  margin-left: 0.28em;\n  vertical-align: 0.09em;\n  border-top: 0.42em solid;\n  border-right: 0.32em solid transparent;\n  border-left: 0.32em solid transparent;\n}\n\n.dropdown {\n  position: absolute;\n  left: 0;\n  left: auto;\n  box-shadow: 0 10px 15px -3px rgba(46, 41, 51, 0.08), 0 4px 6px -2px rgba(71, 63, 79, 0.16);\n  font-size: 0.875rem;\n  z-index: 9999;\n  min-width: 10rem;\n  padding: 0.5rem 0;\n  list-style: none;\n  background-color: #fff;\n  border-radius: 0.5rem;\n  display: none;\n}\n\n.dropdown.show {\n  display: block;\n}\n\n.dropdown .dropdown-submenu {\n  position: absolute;\n  left: 100%;\n  top: -7px;\n}\n\n@media (max-width: 1300px) {\n  nav {\n    display: none;\n    max-height: 50vh;\n    overflow-x: hidden;\n    overflow-y: auto;\n  }\n\n  .menus {\n    padding-left: 0px;\n  }\n\n  .dropdown .dropdown-submenu {\n    position: initial;\n  }\n  .dropdown {\n    position: relative;\n    border-radius: 0;\n    box-shadow: none;\n  }\n  header nav {\n    position: absolute;\n    width: 100%;\n    top: 70px;\n    left: 0;\n    background-color: #e5e2ff;\n  }\n  header.active nav {\n    display: initial;\n  }\n  header nav ul li {\n    width: 100%;\n  }\n  header nav ul li ul {\n    position: relative;\n    width: 100%;\n    left: 0;\n  }\n  header ul li ul li ul {\n    top: 0;\n    left: 0;\n  }\n  header nav ul li:hover ul li {\n    background-color: #ffffff;\n  }\n\n  .menuToggle {\n    position: relative;\n    width: 40px;\n    height: 50px;\n    cursor: pointer;\n    display: flex;\n    justify-content: center;\n    align-items: center;\n    margin-left: auto;\n  }\n\n  .menuToggle::before {\n    content: \"\";\n    position: absolute;\n    width: 100%;\n    height: 3px;\n    background-color: #000000;\n    transform: translateY(-12px);\n    box-shadow: 0 12px #000000;\n  }\n\n  .menuToggle::after {\n    content: \"\";\n    position: absolute;\n    width: 100%;\n    height: 3px;\n    background-color: #000000;\n    transform: translateY(12px);\n  }\n  header.active .menuToggle::before {\n    transform: rotate(45deg);\n    box-shadow: 0 0 #000000;\n  }\n  header.active .menuToggle::after {\n    transform: rotate(315deg);\n  }\n}\n```\n\n## Conclusion\n\nSo that was it for this tutorial. If you still didn't understand what a recursive function does, that's totally fine, because i explained it in short, so go ahead and google it :))"
      }
    ]
  };

const faPosts = {
    2025: [
      {
        local: true,
        lang: "fa",
        slug: "تنظیم-عملکرد-در-اس-کیو-ال-سرور",
        otherPageSlug: "performance-tuning-in-sql-server",
        title: "تنظیم عملکرد در اس کیو ال سرور",
        createdAt: "2025-3-19",
        lastModified: "2025-3-19",
        formattedCreatedAt: "March 19, 2025",
        formattedCreatedAtMonthDay: "March 19",
        faFormatedCreatedAt: "۲۹ اسفند ۱۴۰۳",
        faFormattedCreatedAtMonthDay: "۲۹ اسفند",
        faYear: "۱۴۰۳",
        formattedLastModified: "March 19, 2025",
        faFormatedLastModified: "۲۹ اسفند ۱۴۰۳",
        image: "https://raw.githubusercontent.com/MohammadSeyedabadi/MohammadSeyedabadi.com/refs/heads/master/public/images/posts/how-to-create-a-multilevel-dropdown-menu-in-react/how-to-create-a-multilevel-dropdown-menu-in-react.png",
        excerpt: "تنظیم عملکرد در اس کیو ال سرور",
        tags: [
          "دیتابیس"
        ],
        content: "یک سری چیزا در مورد عملکرد"
      },
      {
        local: true,
        lang: "fa",
        slug: "پست-جدید",
        otherPageSlug: "my-new-post",
        title: "پست جدید من",
        createdAt: "2025-3-19",
        lastModified: "2025-3-19",
        formattedCreatedAt: "March 19, 2025",
        formattedCreatedAtMonthDay: "March 19",
        faFormatedCreatedAt: "۲۹ اسفند ۱۴۰۳",
        faFormattedCreatedAtMonthDay: "۲۹ اسفند",
        faYear: "۱۴۰۳",
        formattedLastModified: "March 19, 2025",
        faFormatedLastModified: "۲۹ اسفند ۱۴۰۳",
        image: "https://raw.githubusercontent.com/MohammadSeyedabadi/MohammadSeyedabadi.com/refs/heads/master/public/images/posts/how-to-create-a-multilevel-dropdown-menu-in-react/how-to-create-a-multilevel-dropdown-menu-in-react.png",
        excerpt: "منوهای کشویی چند سطحی جزء اصلی طراحی وب هستند. آنها با توانایی ارائه چندین گزینه برای انتخاب، نوارهای ناوبری را پویا و سازماندهی می کنند.",
        tags: [
          "فرانت-اند",
          "الگوریتم",
          "ریکت-جی-اس",
          "سون"
        ],
        content: "این آموزش یک نسخه ی ساده شده از [آموزشی](https://blog.logrocket.com/how-create-multilevel-dropdown-menu-react/) هست که Ibadehin Mojeed نوشته.\nاگر توضیحات کامل میخوایید، باید [این مقاله](https://blog.logrocket.com/how-create-multilevel-dropdown-menu-react/) رو بخونید. ایشون همچنین یک مقاله ی دیگه هم برای درست کردن منو با CSS داره. برای خوندنش [اینجا کلیک کنید.](https://blog.logrocket.com/how-create-multilevel-dropdown-menu-react/)\nدر آخر این آموزش یک منو مثل این داریم:\n\n![Final-outcome-react-multilevel-dropdown-menu-project](https://raw.githubusercontent.com/MohammadSeyedabadi/MohammadSeyedabadi.com/refs/heads/master/public/images/posts/how-to-create-a-multilevel-dropdown-menu-in-react/img1-Final-outcome-react-multilevel-dropdown-menu-project.gif)\n\nیک راه خوب برای اینکه یک منوی چند سطحی داشته باشیم اینه که از تابع بازگشتی استفاده کنیم. همون طور که توی GeeksForGeeks توضیح داده شده:\n\n> تابع بازگشتی را می توان به عنوان روتینی تعریف کرد که به طور مستقیم یا غیرمستقیم خود را فراخوانی می کند. به عبارت دیگر، یک تابع بازگشتی تابعی است که یک مسئله را با حل نمونه های کوچکتر از همان مسئله حل می کند. این تکنیک معمولاً در برنامه نویسی برای حل مسائلی استفاده می شود که می توانند به مسائل فرعی ساده تر و مشابه تقسیم شوند.\n\nاساسا تابع بازگشتی، تابعی هست که خودش رو فراخوانی میکنه، یک چیزی مثل این:\n\n```js\nmyRecursiveFunction(){\n   // some code\n   myRecursiveFunction()\n   // some code\n}\n```\n\nخب شاید بگید که اینجوری یک حلقه‌ی بینهایت درست میشه، این حرف درسته اما نه اگر یک شرط بنویسیم که فراخوانی تابع رو در زمان خاصی متوقف کنه. یک چیزی مثل این:\n\n```js\nmyRecursiveFunction(){\n   // some code\n   if(true){\n    return\n   }\n   myRecursiveFunction()\n   // some code\n}\n```\n\nما میتونیم یک تابع بنویسیم که وظیفه‌اش نمایش همه‌ی نوبار ( navbar ) باشه، من اسمش رو گذاشتم Header همونطور که Ibadehin Mojeed هم همین کارو کرده، دلیل‌اش هم اینه که تگ هدر‌ مون که داخل این تابع هست دور همه چیز پیچیده، اما شما اسمشو هرچی بخوایید میتونید بزارید. درضمن توی این تابع برای صفحه نمایش های کوچیک از usestate استفاده کردم.\n\n\n## در نهایت\n\nامیدوارم مفید بوده باشه، اگر شما همچنان متوجه نشدید که یک تابع بازگشتی چیکار میکنه، کاملا طبیعی هست، چون من به صورت مختصر توضیح‌اش دادم، پس خوبه که برید و سرچ کنید."
      }
    ],
    2023: [
      {
        local: true,
        lang: "fa",
        slug: "نحوه-ایجاد-یک-منوی-چند-سطحی-در-ریکت",
        otherPageSlug: "how-to-create-a-multilevel-dropdown-menu-in-react",
        title: "نحوه ایجاد یک منوی چند سطحی در ریکت",
        createdAt: "2023-11-19",
        lastModified: "2023-11-19",
        formattedCreatedAt: "November 19, 2023",
        formattedCreatedAtMonthDay: "November 19",
        faFormatedCreatedAt: "۲۸ آبان ۱۴۰۲",
        faFormattedCreatedAtMonthDay: "۲۸ آبان",
        faYear: "۱۴۰۲",
        formattedLastModified: "November 19, 2023",
        faFormatedLastModified: "۲۸ آبان ۱۴۰۲",
        image: "https://raw.githubusercontent.com/MohammadSeyedabadi/MohammadSeyedabadi.com/refs/heads/master/public/images/posts/how-to-create-a-multilevel-dropdown-menu-in-react/how-to-create-a-multilevel-dropdown-menu-in-react.png",
        excerpt: "منوهای کشویی چند سطحی جزء اصلی طراحی وب هستند. آنها با توانایی ارائه چندین گزینه برای انتخاب، نوارهای ناوبری را پویا و سازماندهی می کنند.",
        tags: [
          "فرانت-اند",
          "الگوریتم",
          "ریکت-جی-اس"
        ],
        content: "این آموزش یک نسخه ی ساده شده از [آموزشی](https://blog.logrocket.com/how-create-multilevel-dropdown-menu-react/) هست که Ibadehin Mojeed نوشته.\nاگر توضیحات کامل میخوایید، باید [این مقاله](https://blog.logrocket.com/how-create-multilevel-dropdown-menu-react/) رو بخونید. ایشون همچنین یک مقاله ی دیگه هم برای درست کردن منو با CSS داره. برای خوندنش [اینجا کلیک کنید.](https://blog.logrocket.com/how-create-multilevel-dropdown-menu-react/)\nدر آخر این آموزش یک منو مثل این داریم:\n\n![Final-outcome-react-multilevel-dropdown-menu-project](https://raw.githubusercontent.com/MohammadSeyedabadi/MohammadSeyedabadi.com/refs/heads/master/public/images/posts/how-to-create-a-multilevel-dropdown-menu-in-react/img1-Final-outcome-react-multilevel-dropdown-menu-project.gif)\n\nیک راه خوب برای اینکه یک منوی چند سطحی داشته باشیم اینه که از تابع بازگشتی استفاده کنیم. همون طور که توی GeeksForGeeks توضیح داده شده:\n\n> تابع بازگشتی را می توان به عنوان روتینی تعریف کرد که به طور مستقیم یا غیرمستقیم خود را فراخوانی می کند. به عبارت دیگر، یک تابع بازگشتی تابعی است که یک مسئله را با حل نمونه های کوچکتر از همان مسئله حل می کند. این تکنیک معمولاً در برنامه نویسی برای حل مسائلی استفاده می شود که می توانند به مسائل فرعی ساده تر و مشابه تقسیم شوند.\n\nاساسا تابع بازگشتی، تابعی هست که خودش رو فراخوانی میکنه، یک چیزی مثل این:\n\n```js\nmyRecursiveFunction(){\n   // some code\n   myRecursiveFunction()\n   // some code\n}\n```\n\nخب شاید بگید که اینجوری یک حلقه‌ی بینهایت درست میشه، این حرف درسته اما نه اگر یک شرط بنویسیم که فراخوانی تابع رو در زمان خاصی متوقف کنه. یک چیزی مثل این:\n\n```js\nmyRecursiveFunction(){\n   // some code\n   if(true){\n    return\n   }\n   myRecursiveFunction()\n   // some code\n}\n```\n\nهمچنین خوبه بدونید که هر مسئله‌ای که با تابع بازگشتی حل بشه، همیشه میتونه با حلقه‌های for هم حل بشه، اما در اکثر موارد، تابع بازگشتی کارمون رو خیلی راحت تر میکنه. خب در شرایط ما، فرض کنید یک آرایه از منو‌ها و زیر منوها داریم. به این شکل:\n\n```js\n[\n  {\n    title: \"Home\",\n    url: \"/\",\n  },\n  {\n    title: \"Services\",\n    url: \"/services\",\n    submenu: [\n      {\n        title: \"web design\",\n        url: \"web-design\",\n      },\n      {\n        title: \"web development\",\n        url: \"web-dev\",\n        submenu: [\n          {\n            title: \"Frontend\",\n            url: \"frontend\",\n          },\n          {\n            title: \"Backend\",\n            submenu: [\n              {\n                title: \"NodeJS\",\n                url: \"node\",\n              },\n              {\n                title: \"PHP\",\n                url: \"php\",\n              },\n            ],\n          },\n        ],\n      },\n      {\n        title: \"SEO\",\n        url: \"seo\",\n      },\n    ],\n  },\n  {\n    title: \"About\",\n    url: \"/about\",\n    submenu: [\n      {\n        title: \"Who we are\",\n        url: \"who-we-are\",\n      },\n      {\n        title: \"Our values\",\n        url: \"our-values\",\n      },\n    ],\n  },\n];\n```\n\nما میتونیم یک تابع بنویسیم که وظیفه‌اش نمایش همه‌ی نوبار ( navbar ) باشه، من اسمش رو گذاشتم Header همونطور که Ibadehin Mojeed هم همین کارو کرده، دلیل‌اش هم اینه که تگ هدر‌ مون که داخل این تابع هست دور همه چیز پیچیده، اما شما اسمشو هرچی بخوایید میتونید بزارید. درضمن توی این تابع برای صفحه نمایش های کوچیک از usestate استفاده کردم.\n\n```jsx\nexport default function Header() {\n  const [toggle, setToggle] = useState(false);\n  return (\n    <header className={` ${toggle ? \"active\" : \"\"} `}>\n      <div className=\"nav-area\">\n        <Link href=\"/\" className=\"logo\">\n          logo\n        </Link>\n        {menuItems.length ? (\n          <>\n            <nav>\n              <ul className=\"menus\">\n                {menuItems.map((menu, index) => {\n                  const depthLevel = 0;\n                  return (\n                    <MenuItems\n                      items={menu}\n                      key={index}\n                      depthLevel={depthLevel}\n                    />\n                  );\n                })}\n              </ul>\n            </nav>\n            <div\n              className=\"menuToggle\"\n              onClick={() => setToggle(toggle === true ? false : true)}\n            ></div>\n          </>\n        ) : null}\n      </div>\n    </header>\n  );\n}\n\nfunction MenuItems({ items, depthLevel }) {\n  const [dropdown, setDropdown] = useState(false);\n\n  function onMouseEnter() {\n    window.innerWidth > 960 && setDropdown(true);\n  }\n\n  function onMouseLeave() {\n    window.innerWidth > 960 && setDropdown(false);\n  }\n\n  return (\n    <li\n      className=\"menu-items\"\n      onMouseEnter={onMouseEnter}\n      onMouseLeave={onMouseLeave}\n    >\n      {items.submenu ? (\n        <>\n          <button\n            type=\"button\"\n            aria-haspopup=\"menu\"\n            aria-expanded={dropdown ? \"true\" : \"false\"}\n            onClick={() => setDropdown((prev) => !prev)}\n          >\n            {items.title}{\" \"}\n            {depthLevel > 0 ? <span>&raquo;</span> : <span className=\"arrow\" />}\n          </button>\n          <Dropdown\n            depthLevel={depthLevel}\n            submenus={items.submenu}\n            dropdown={dropdown}\n          />\n        </>\n      ) : (\n        <Link href={items.url}>{items.title}</Link>\n      )}\n    </li>\n  );\n}\n\nfunction Dropdown({ depthLevel, submenus, dropdown }) {\n  depthLevel = depthLevel + 1;\n  const dropdownClass = depthLevel > 1 ? \"dropdown-submenu\" : \"\";\n\n  return (\n    <ul className={` dropdown ${dropdownClass} ${dropdown ? \"show\" : \"\"} `}>\n      {submenus.map((submenu, index) => (\n        <MenuItems items={submenu} key={index} depthLevel={depthLevel} />\n      ))}\n    </ul>\n  );\n}\n```\n\nهمونطور که میبینید یک تابع MenuItems داخل تابع Header هست، که وظیفه‌اش ساختن زیر منو ( ها ) داخل منو ( ها ) هست. تابع MenuItems همون تابع بازگشتی ما هست. این تابع خودش رو به صورت غیر مستقیم و توسط تابع Dropdown فراخوانی میکنه و ? items.submenu همون شرط مبنا هست، اگر حاصل‌اش غلط باشه، اون وقت یک لینک درست میکنه، اما اگر حاصل‌اش درست باشه یک button درست میکنه ( که کاربر میتونه روش کلیک یا هاور کنه تا زیر منو ( ها ) رو ببینه ) و بعد دوباره خودش رو توسط تابع Dropdown فراخوانی میکنه تا دوباره یک Link درست کنه یا یک button.\n\nاین هم کد CSS تا کد مون بیشتر حس یک نویگیشن ( Navigation ) بده:\n\n```css\n* {\n  margin: 0;\n  padding: 0;\n  box-sizing: border-box;\n}\n\nbody {\n  font-family: sans-serif;\n}\n\nheader {\n  box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.07), 0 1px 2px 0 rgba(0, 0, 0, 0.05);\n  color: #212529;\n}\n\n.nav-area {\n  display: flex;\n  align-items: center;\n  max-width: 1200px;\n  margin: 0 auto;\n  padding: 10px 20px;\n}\n\n.logo {\n  text-decoration: none;\n  font-size: 25px;\n  color: inherit;\n  margin-right: 20px;\n}\n\n.menus {\n  display: flex;\n  align-items: center;\n  flex-wrap: wrap;\n  list-style: none;\n}\n\n.menu-items {\n  position: relative;\n  font-size: 14px;\n}\n\n.menu-items a {\n  display: block;\n  font-size: inherit;\n  color: inherit;\n  text-decoration: none;\n}\n\n.menu-items button {\n  display: flex;\n  align-items: center;\n  color: inherit;\n  font-size: inherit;\n  border: none;\n  background-color: transparent;\n  cursor: pointer;\n  width: 100%;\n}\n\nbutton span {\n  margin-left: 3px;\n}\n\n.menu-items > a,\n.menu-items button {\n  text-align: left;\n  padding: 0.7rem 1rem;\n}\n\n.menu-items a:hover,\n.menu-items button:hover {\n  background-color: #f2f2f2;\n}\n\n.arrow::after {\n  content: \"\";\n  display: inline-block;\n  margin-left: 0.28em;\n  vertical-align: 0.09em;\n  border-top: 0.42em solid;\n  border-right: 0.32em solid transparent;\n  border-left: 0.32em solid transparent;\n}\n\n.dropdown {\n  position: absolute;\n  left: 0;\n  left: auto;\n  box-shadow: 0 10px 15px -3px rgba(46, 41, 51, 0.08), 0 4px 6px -2px rgba(71, 63, 79, 0.16);\n  font-size: 0.875rem;\n  z-index: 9999;\n  min-width: 10rem;\n  padding: 0.5rem 0;\n  list-style: none;\n  background-color: #fff;\n  border-radius: 0.5rem;\n  display: none;\n}\n\n.dropdown.show {\n  display: block;\n}\n\n.dropdown .dropdown-submenu {\n  position: absolute;\n  left: 100%;\n  top: -7px;\n}\n\n@media (max-width: 1300px) {\n  nav {\n    display: none;\n    max-height: 50vh;\n    overflow-x: hidden;\n    overflow-y: auto;\n  }\n\n  .menus {\n    padding-left: 0px;\n  }\n\n  .dropdown .dropdown-submenu {\n    position: initial;\n  }\n  .dropdown {\n    position: relative;\n    border-radius: 0;\n    box-shadow: none;\n  }\n  header nav {\n    position: absolute;\n    width: 100%;\n    top: 70px;\n    left: 0;\n    background-color: #e5e2ff;\n  }\n  header.active nav {\n    display: initial;\n  }\n  header nav ul li {\n    width: 100%;\n  }\n  header nav ul li ul {\n    position: relative;\n    width: 100%;\n    left: 0;\n  }\n  header ul li ul li ul {\n    top: 0;\n    left: 0;\n  }\n  header nav ul li:hover ul li {\n    background-color: #ffffff;\n  }\n\n  .menuToggle {\n    position: relative;\n    width: 40px;\n    height: 50px;\n    cursor: pointer;\n    display: flex;\n    justify-content: center;\n    align-items: center;\n    margin-left: auto;\n  }\n\n  .menuToggle::before {\n    content: \"\";\n    position: absolute;\n    width: 100%;\n    height: 3px;\n    background-color: #000000;\n    transform: translateY(-12px);\n    box-shadow: 0 12px #000000;\n  }\n\n  .menuToggle::after {\n    content: \"\";\n    position: absolute;\n    width: 100%;\n    height: 3px;\n    background-color: #000000;\n    transform: translateY(12px);\n  }\n  header.active .menuToggle::before {\n    transform: rotate(45deg);\n    box-shadow: 0 0 #000000;\n  }\n  header.active .menuToggle::after {\n    transform: rotate(315deg);\n  }\n}\n```\n\n## در نهایت\n\nامیدوارم مفید بوده باشه، اگر شما همچنان متوجه نشدید که یک تابع بازگشتی چیکار میکنه، کاملا طبیعی هست، چون من به صورت مختصر توضیح‌اش دادم، پس خوبه که برید و سرچ کنید."
      }
    ]
  };

export function getAllPosts(locale) {
  if (locale === "en") {
    return enPosts;
  } else {
    return faPosts;
  }
}
