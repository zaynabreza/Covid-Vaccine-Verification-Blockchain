# Covid-Vaccine-Verification-Blockchain
Using Ethereum Smart Contracts to verify any user's vaccination via Identification Number or QR Code.

## Requirements:
1. Ganache
2. Node JS
3. Truffle Suite
4. React

## Steps to Run:
1. The vaccination.sol file containing the contract will go into the contracts folder.
2. The 2_vaccinations.js file will go into the migrations folder as this deploys the contract, sending the first three ganache accounts as parameters to its constructor as Vaccination Authorities (VA).
3. For the react application, the following libraries need to be installed beforehand if they aren't already installed. To individually install them, the following commands can be used:
a. npm install react-bootstrap
b. npm install react-qr-reader
c. npm install react-tabs
d. npm install web3
4. Simply navigating to the FrontEnd_App folder and running npm install will update and install the required dependencies. This folder will now be the project folder for the react application.
5. Web3 will still need to be installed manually even if npm install has been used. Run npm install web3
6. After deploying the contract, using the command truffle migrate –reset, the contract address in the config.js found in the src folder needs to be updated to the address it has been deployed upon in line 2.
7. In order to start the application, run the command npm start from the directory of the react application.
1. The vaccination.sol file containing the contract will go into the contracts folder in the truffle directory just initialized
2. The 2_vaccinations.js file will go into the migrations folder as this deploys the contract, sending the first three ganache accounts as parameters to its constructor as Vaccination Authorities (VA).
3. For the react application, the following libraries need to be installed beforehand if they aren't already installed. To individually install them, the following commands can be used:
a. npm install react-bootstrap
b. npm install react-qr-reader
c. npm install react-tabs
d. npm install web3
4. In case of any error, we have also submitted the node_modules folder. Simply navigating to the FrontEnd_App folder and running npm install will update and install the required dependencies. This folder will now be the project folder for the react application.
5. Web3 will still need to be installed manually even if npm install has been used. Run npm install web3
6. After deploying the contract, using the command truffle migrate –reset, the contract address in the config.js found in the src folder needs to be updated to the address it has been deployed upon in line 2.
7. In order to start the application, run the command npm start from the directory of the react application.

## Features:
1. Register a New User
2. Vaccine Registration
3. Verify Vaccination via QR Code/CNIC
4. Adding a New VA via Voting
5. View Record Details
