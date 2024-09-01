# Motivations

## What is Wabe ?

Wabe is a solution that simplifies the creation of your backends in TypeScript. It handles all the complexities of a backend for you and offers an all-in-one solution that can be set up in just a few minutes. It manages the database, authentication, automatic generation of your GraphQL API based on the schema you’ve defined, security with a multi-level permission system, a hook system that allows you to perform actions before or after each database query, and many other features that you can explore by browsing the documentation. And because we know that every application is unique, Wabe allows you to customize everything to meet your needs. You can, for example, add your own authentication methods, your own GraphQL resolvers, your own REST routes, your own enums, your own GraphQL scalars, and much more. Wabe is both a comprehensive and customizable toolbox.

## Why should you use Wabe ?

After working with Parse Server for a long time, which also offers a simplified backend solution, I identified several issues that make the tool difficult for many users (especially those not deeply familiar with the project): the absence of TypeScript, unclear documentation, meaning no type safety during development, the lack of key features like typing GraphQL objects without using Nexus, and the project's very limited evolution. On the other hand, recent solutions like Supabase have emerged, but they severely lack customization options. Supabase can be used for relatively simple applications (CRUD), but when it comes to complex applications that require multiple elements, such as connections to external APIs, new GraphQL resolvers with very specific behaviors, etc., it falls short. With Wabe, we aimed to combine the best of both worlds: the modernity of one and the flexibility of the other. It is with this idea in mind that Wabe was born, and it has a bright future ahead!