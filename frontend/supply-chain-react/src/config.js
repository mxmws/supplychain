export const contract_address_1 = "0x2fb08a457e7dfa5c2ee293674ea664ff32568a37"

export const contract_address_2 = "0x875893e861820feacd8c7c0168f4461ddb58103d"

export const contract_abi_1 = [
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": false,
				"internalType": "address",
				"name": "product",
				"type": "address"
			},
			{
				"indexed": false,
				"internalType": "string",
				"name": "name",
				"type": "string"
			},
			{
				"indexed": false,
				"internalType": "address[]",
				"name": "predecessors",
				"type": "address[]"
			},
			{
				"indexed": false,
				"internalType": "address[]",
				"name": "succcessors",
				"type": "address[]"
			},
			{
				"indexed": false,
				"internalType": "address[]",
				"name": "lables",
				"type": "address[]"
			}
		],
		"name": "ProductAdded",
		"type": "event"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "_labelAddress",
				"type": "address"
			}
		],
		"name": "Get_Label",
		"outputs": [
			{
				"internalType": "contract Label",
				"name": "",
				"type": "address"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "_productAddress",
				"type": "address"
			}
		],
		"name": "Get_Product",
		"outputs": [
			{
				"internalType": "contract Product",
				"name": "",
				"type": "address"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "string",
				"name": "_name",
				"type": "string"
			},
			{
				"internalType": "address[]",
				"name": "_ProductIDs",
				"type": "address[]"
			},
			{
				"internalType": "string",
				"name": "_ipfsAddress",
				"type": "string"
			}
		],
		"name": "addLabel",
		"outputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "string",
				"name": "_name",
				"type": "string"
			},
			{
				"internalType": "uint256",
				"name": "_carbonFootprint",
				"type": "uint256"
			},
			{
				"internalType": "address[]",
				"name": "_labelIDs",
				"type": "address[]"
			},
			{
				"internalType": "address[]",
				"name": "_successors",
				"type": "address[]"
			},
			{
				"internalType": "address[]",
				"name": "_predecessors",
				"type": "address[]"
			},
			{
				"internalType": "string",
				"name": "_ipfsAddress",
				"type": "string"
			}
		],
		"name": "addProduct",
		"outputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "_id",
				"type": "address"
			}
		],
		"name": "getLabel",
		"outputs": [
			{
				"internalType": "string",
				"name": "_name",
				"type": "string"
			},
			{
				"internalType": "address[]",
				"name": "_labels",
				"type": "address[]"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "_id",
				"type": "address"
			}
		],
		"name": "getProduct",
		"outputs": [
			{
				"internalType": "string",
				"name": "_name",
				"type": "string"
			},
			{
				"internalType": "uint256",
				"name": "carbonFootprint",
				"type": "uint256"
			},
			{
				"internalType": "string",
				"name": "swarmStorageAddress",
				"type": "string"
			},
			{
				"internalType": "address[]",
				"name": "_labels",
				"type": "address[]"
			},
			{
				"internalType": "address[]",
				"name": "predecessors",
				"type": "address[]"
			},
			{
				"internalType": "address[]",
				"name": "successors",
				"type": "address[]"
			}
		],
		"stateMutability": "view",
		"type": "function"
	}
]



export const contract_abi_2 = [
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "_supplychainId",
				"type": "address"
			},
			{
				"internalType": "address",
				"name": "firstAddress",
				"type": "address"
			},
			{
				"internalType": "enum relation",
				"name": "r1",
				"type": "uint8"
			},
			{
				"internalType": "address",
				"name": "secondAddress",
				"type": "address"
			},
			{
				"internalType": "enum relation",
				"name": "r2",
				"type": "uint8"
			}
		],
		"name": "addLink",
		"outputs": [
			{
				"internalType": "bool",
				"name": "handshake_complete",
				"type": "bool"
			}
		],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": false,
				"internalType": "address",
				"name": "firstContract",
				"type": "address"
			},
			{
				"indexed": false,
				"internalType": "address",
				"name": "secondContract",
				"type": "address"
			}
		],
		"name": "ContractsLinked",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": false,
				"internalType": "address",
				"name": "firstContract",
				"type": "address"
			},
			{
				"indexed": false,
				"internalType": "address",
				"name": "SecondContract",
				"type": "address"
			}
		],
		"name": "LinkRemoved",
		"type": "event"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "_supplychainId",
				"type": "address"
			},
			{
				"internalType": "address",
				"name": "firstAddress",
				"type": "address"
			},
			{
				"internalType": "enum relation",
				"name": "r1",
				"type": "uint8"
			},
			{
				"internalType": "address",
				"name": "secondAddress",
				"type": "address"
			},
			{
				"internalType": "enum relation",
				"name": "r2",
				"type": "uint8"
			}
		],
		"name": "removeLink",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	}
]