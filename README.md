# README

Hi! This is the Next JS frontend that powers https://kadince-todo-frontend.onrender.com/. This is a sample Todo application to show off some basic crud, and filtering skills. The base ask was....

> 1 week to complete the assignment while meeting at least the minimum functionality requirements:
> 
> *	View a list of to-do items with the ability to filter the list by
> pending, complete, and all to-dos.*
> 
> *	Create a new to-do item
> *	Edit a to-do item
> *	Delete a to-do item
> *	Complete a to-do item

## Backend Repository

The backend github can be found here: https://github.com/Nscha1b/kadince-todo-api


## Starting the project with Containers

Make sure you have docker installed. The simplest way is:
https://www.docker.com/products/docker-desktop/

**1. Start the Services:**
```
docker-compose  up  --build
```
**2. Access your Frontend at:**  http://localhost:4200
**3. Shell into the container (if needed):** 
```
docker-compose  exec  frontend  /bin/bash
--or---
docker-compose  exec  frontend  node
```
**4. Stopping the  service:** 
```
docker-compose  down
```

Or to run it outside of a container, simply
```
npm  run  dev
```