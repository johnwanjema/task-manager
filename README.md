# Task Manager

## Description

A Task logger monitors when the team members should carry out tasks as they fall due.
It also generates report of all the tasks that should have been done prior to the time of generating the report.


### Created by John Wanjema 26/09/2021

## Setup and installations

### Prerequisites

1. [Composer](https://getcomposer.org/)
1. [Laravel](https://laravel.com/)
2. [Vue](https://vuejs.org/)
3. [MySQl](https://www.mysql.com/)


### Technologies used

    - Laravel
    - Vue js
    - HTML
    - CSS

### Clone the Repo and rename it to suit your needs.

```bash
git clone https://github.com/johnwanjema/task-manager
```

### Initialize git and add the remote repository

```bash
git init
```

```bash
git remote add origin <your-repository-url>
```

### Setting up environment variables

Copy content in  `.env.example` to a `.env` file:

```
cp .env.example .env
```

Create database and set up  your `.env` 

```
DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=<database name>
DB_USERNAME=<userName>
DB_PASSWORD=<password>
```


## Build Setup

``` bash

composer install
```

``` bash

npm install
```


## Run the app

### Generate application key
```bash

php artisan key:generate
```

### Run migration and seeder
```bash

php artisan migrate
```

### Start Application
```bash

php artisan serve
```

### Access the application at localhost:8000

Open [localhost:8000](http://localhost:8000/)

## Bugs

Create an issue mentioning the bug you have found.

### Known bugs

- N/A

## Support and contact details

Contact [John Wanjema](https://github.com/johnwanjema) for further help/support.

