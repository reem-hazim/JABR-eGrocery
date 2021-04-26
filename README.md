# JABR-eGrocery Web App
An e-Grocery web application created as a project for the class CS-UH 2012 Software Engineering, taught in Spring 2021 by Professor Luiz Capretz.

### Team members:
- Reem Hazim (class of 2023)
- Brian Kim (class of 2022)
- Joseph Hong (class of 2023)
- Armaan Agrawal (class of 2023)

### To run
1. Make sure you have already installed [Node.js and npm](https://nodejs.org/en/download/)
2. Make sure you have installed [MongoDB](https://docs.mongodb.com/manual/installation/). Once installed, run MongoDB (the mongod process).
3. Clone this repository: 
```
git clone https://github.com/reem-hazim/JABR-eGrocery.git
cd JABR-eGrocery
```
4. Install the required Node packages:
```
npm install
```
5. Upload the seed products and users to your database:
```
cd seeds
node seedProducts.js
node seedUsers.js
```
5. Run the Express server
```
node index.js
```
You can visit the website by pointing your browser to 
```
http://localhost:3000/
```