export const SIMP_STORAGE_ADDRESS =
    '0x0E19937369E64d94dAdc061f7df48f8d1c247A74'
export const SIMP_STORAGE_ABI =[
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "a1",
          "type": "address"
        },
        {
          "internalType": "address",
          "name": "a2",
          "type": "address"
        },
        {
          "internalType": "address",
          "name": "a3",
          "type": "address"
        }
      ],
      "stateMutability": "nonpayable",
      "type": "constructor"
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "name": "authorities",
      "outputs": [
        {
          "internalType": "address",
          "name": "",
          "type": "address"
        }
      ],
      "stateMutability": "view",
      "type": "function",
      "constant": true
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "name": "petitions",
      "outputs": [
        {
          "internalType": "address",
          "name": "petitioner",
          "type": "address"
        },
        {
          "internalType": "string",
          "name": "name",
          "type": "string"
        },
        {
          "internalType": "uint8",
          "name": "timeLapsed",
          "type": "uint8"
        },
        {
          "internalType": "uint8",
          "name": "votesReceived",
          "type": "uint8"
        },
        {
          "internalType": "bool",
          "name": "added",
          "type": "bool"
        }
      ],
      "stateMutability": "view",
      "type": "function",
      "constant": true
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "_petitioner",
          "type": "address"
        }
      ],
      "name": "vote",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "string",
          "name": "_name",
          "type": "string"
        }
      ],
      "name": "submitPetition",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "viewPetitions",
      "outputs": [
        {
          "components": [
            {
              "internalType": "address",
              "name": "petitioner",
              "type": "address"
            },
            {
              "internalType": "string",
              "name": "name",
              "type": "string"
            },
            {
              "internalType": "uint8",
              "name": "timeLapsed",
              "type": "uint8"
            },
            {
              "internalType": "uint8",
              "name": "votesReceived",
              "type": "uint8"
            },
            {
              "internalType": "address[]",
              "name": "voters",
              "type": "address[]"
            },
            {
              "internalType": "bool",
              "name": "added",
              "type": "bool"
            }
          ],
          "internalType": "struct Vaccinations.petition[]",
          "name": "",
          "type": "tuple[]"
        }
      ],
      "stateMutability": "view",
      "type": "function",
      "constant": true
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "petitioner",
          "type": "address"
        }
      ],
      "name": "removePetition",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "_voter",
          "type": "address"
        },
        {
          "internalType": "address[]",
          "name": "_voters",
          "type": "address[]"
        }
      ],
      "name": "checkIfVoted",
      "outputs": [
        {
          "internalType": "bool",
          "name": "",
          "type": "bool"
        }
      ],
      "stateMutability": "view",
      "type": "function",
      "constant": true
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "_vacc",
          "type": "address"
        }
      ],
      "name": "checkIfVaccinationAuthority",
      "outputs": [
        {
          "internalType": "bool",
          "name": "trust",
          "type": "bool"
        }
      ],
      "stateMutability": "view",
      "type": "function",
      "constant": true
    },
    {
      "inputs": [
        {
          "internalType": "string",
          "name": "_id",
          "type": "string"
        },
        {
          "internalType": "string",
          "name": "_name",
          "type": "string"
        },
        {
          "internalType": "bool",
          "name": "_gender",
          "type": "bool"
        },
        {
          "internalType": "string",
          "name": "_nationality",
          "type": "string"
        },
        {
          "internalType": "address",
          "name": "_user_address",
          "type": "address"
        }
      ],
      "name": "registerUser",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "string",
          "name": "user_id",
          "type": "string"
        },
        {
          "internalType": "string",
          "name": "_vacName",
          "type": "string"
        },
        {
          "internalType": "string",
          "name": "_batchID",
          "type": "string"
        },
        {
          "internalType": "string",
          "name": "location",
          "type": "string"
        },
        {
          "internalType": "string",
          "name": "date",
          "type": "string"
        }
      ],
      "name": "addVaccination",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "string",
          "name": "user_id",
          "type": "string"
        }
      ],
      "name": "userExists",
      "outputs": [
        {
          "internalType": "bool",
          "name": "",
          "type": "bool"
        }
      ],
      "stateMutability": "view",
      "type": "function",
      "constant": true
    },
    {
      "inputs": [
        {
          "internalType": "string",
          "name": "user_id",
          "type": "string"
        }
      ],
      "name": "calculateHash",
      "outputs": [
        {
          "internalType": "bytes32",
          "name": "",
          "type": "bytes32"
        }
      ],
      "stateMutability": "view",
      "type": "function",
      "constant": true
    },
    {
      "inputs": [
        {
          "internalType": "string",
          "name": "user_id",
          "type": "string"
        }
      ],
      "name": "getVaccinationRecord",
      "outputs": [
        {
          "components": [
            {
              "internalType": "string",
              "name": "user_id",
              "type": "string"
            },
            {
              "internalType": "address",
              "name": "user_address",
              "type": "address"
            },
            {
              "internalType": "string",
              "name": "nationality",
              "type": "string"
            },
            {
              "internalType": "string",
              "name": "name",
              "type": "string"
            },
            {
              "internalType": "bool",
              "name": "gender",
              "type": "bool"
            },
            {
              "internalType": "address",
              "name": "createdBy",
              "type": "address"
            },
            {
              "internalType": "bytes32",
              "name": "detailshash",
              "type": "bytes32"
            },
            {
              "components": [
                {
                  "internalType": "string",
                  "name": "name",
                  "type": "string"
                },
                {
                  "internalType": "string",
                  "name": "batch_id",
                  "type": "string"
                },
                {
                  "internalType": "address",
                  "name": "addedBy",
                  "type": "address"
                },
                {
                  "internalType": "string",
                  "name": "administrationDate",
                  "type": "string"
                },
                {
                  "internalType": "string",
                  "name": "location",
                  "type": "string"
                }
              ],
              "internalType": "struct Vaccinations.vaccine[]",
              "name": "vaccinations",
              "type": "tuple[]"
            }
          ],
          "internalType": "struct Vaccinations.vaccination_record",
          "name": "",
          "type": "tuple"
        }
      ],
      "stateMutability": "view",
      "type": "function",
      "constant": true
    },
    {
      "inputs": [
        {
          "internalType": "string",
          "name": "user_id",
          "type": "string"
        }
      ],
      "name": "getVaccinationHash",
      "outputs": [
        {
          "internalType": "bytes32",
          "name": "",
          "type": "bytes32"
        }
      ],
      "stateMutability": "view",
      "type": "function",
      "constant": true
    },
    {
      "inputs": [
        {
          "internalType": "string",
          "name": "user_id",
          "type": "string"
        }
      ],
      "name": "getVaccinationRecordPublic",
      "outputs": [
        {
          "internalType": "string",
          "name": "",
          "type": "string"
        }
      ],
      "stateMutability": "view",
      "type": "function",
      "constant": true
    },
    {
      "inputs": [],
      "name": "getVaccinationAuthorities",
      "outputs": [
        {
          "internalType": "address[]",
          "name": "",
          "type": "address[]"
        }
      ],
      "stateMutability": "view",
      "type": "function",
      "constant": true
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "_add",
          "type": "address"
        }
      ],
      "name": "getAuthorityName",
      "outputs": [
        {
          "internalType": "string",
          "name": "",
          "type": "string"
        }
      ],
      "stateMutability": "view",
      "type": "function",
      "constant": true
    },
    {
      "inputs": [
        {
          "internalType": "string",
          "name": "data",
          "type": "string"
        }
      ],
      "name": "getHashQR",
      "outputs": [
        {
          "internalType": "bytes32",
          "name": "",
          "type": "bytes32"
        }
      ],
      "stateMutability": "view",
      "type": "function",
      "constant": true
    }
  ]