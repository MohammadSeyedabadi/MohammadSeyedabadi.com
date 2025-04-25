---
local: true
lang: en
slug: my-new-post
otherPageSlug: پست-جدید
title: My new post
createdAt: 2025-3-19
lastModified: 2025-3-19
image: https://raw.githubusercontent.com/MohammadSeyedabadi/MohammadSeyedabadi.com/refs/heads/master/public/images/posts/how-to-create-a-multilevel-dropdown-menu-in-react/how-to-create-a-multilevel-dropdown-menu-in-react.png
excerpt: Multilevel dropdown menus are a staple of web design. With the ability to provide multiple options to select from, they make navigation bars dynamic and organized.
tags:
  - front-end
  - algorithm
  - reactjs
  - soon
---

This tutorial is a simplified version of [this tutorial](https://blog.logrocket.com/how-create-multilevel-dropdown-menu-react/) written by Ibadehin Mojeed.
If you want a complete explanation, you have to read his article. He also has another article where he explans
how to make dropdown menus with CSS. You could check that out [here.](https://blog.logrocket.com/making-dropdown-menus-css/) At the end we will have something like this:

![Final-outcome-react-multilevel-dropdown-menu-project](https://raw.githubusercontent.com/MohammadSeyedabadi/MohammadSeyedabadi.com/refs/heads/master/public/images/posts/how-to-create-a-multilevel-dropdown-menu-in-react/img1-Final-outcome-react-multilevel-dropdown-menu-project.gif)

So let's start with our code. If you want to create a multilevel dropdown menu, one good way is
to use recursive functions. As in [GeeksForGeeks](https://www.geeksforgeeks.org/recursive-functions/) explained:

> A Recursive function can be defined as a routine that calls itself directly or indirectly. In other words, a recursive function is a function that solves a problem by solving smaller instances of the same problem. This technique is commonly used in programming to solve problems that can be broken down into simpler, similar subproblems.

Basically a Recursive function is a function that calls it self, something like this:

```js
 myRecursiveFunction(){
    // some code
    myRecursiveFunction()
   // some code
}
```

Well you may say that _**it causes an infinite loop.**_ That's right but not if we have a condition that stops the function call in a certain state, something like:

```js
myRecursiveFunction(){
   // some code
   if(true){
    return
   }
   myRecursiveFunction()
   // some code
}
```

As you see, there is a MenuItems function inside of Header function, which is responsible for
creating submenus ( lis ) inside of our menus ( uls ), or maybe just single submenus ( lis ).
Our MenuItems function is our recursive function, it calls itself indirectly by Dropdown function and
that **_items.submenu ?_** is its termination condition, if that condition is false, then it just simply creates a
Link, but if that is true, then it will create a button( so the user can click or hover to see submenu/s )
and then it calls itself by Dropdown function to again, create either a Link or a button.

Here is the css code to make it feel more like a navigation:


## Conclusion

So that was it for this tutorial. If you still didn't understand what a recursive function does, that's totally fine, because i explained it in short, so go ahead and google it :))
