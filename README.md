[![Stories in Ready](https://badge.waffle.io/brandonking7/web-boilerplate.png?label=ready&title=Ready)](https://waffle.io/brandonking7/web-boilerplate)
# web-boilerplate
A template for new front-end projects.  
[Waffle.io Board](https://waffle.io/brandonking7/web-boilerplate)

## Using
1. Clone the repo
```
git clone https://github.com/brandonking7/web-boilerplate
```
2. Move `web-boilerplate` to your project name
```
mv web-boilerplate *PROJECT_NAME*
cd *PROJECT_NAME*
```
3. Delete the .git folder inside it
```
rm -rf .git
```
4. Run a new git init
```
git init
```
5. Change the package.json file to information about your project
6. Delete this README and create a new one for your project
7. Commit all the files as an initial commit and push to your origin
```
git remote set-url origin https://github.com/brandonking7/*PROJECT_NAME*.git
git add .
git commit -m "Initial commit"
git push origin master
```

## Commands

Run the server with:
```
yarn start
```

Run your tests with:
```
yarn test
```

Run a build with:
```
yarn build
```

## Docker Commands

Build and start the server:
```
docker-compose up --build
```

Run your tests with:
```
docker-compose exec web yarn test
```

Run a build with:
```
docker-compose exec web yarn build
```

If your terminal closes run:
```
docker-compose logs --follow
```
