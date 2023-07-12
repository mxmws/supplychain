export const contract_address_supplychain = "0xb7C4a348Ceb43d9e6DB6645E6461307DcCeAb20d"

export const contract_address_linker = "0x1B1bB81C6A082aDf5d0Dc2b725ED93Ab882E0208"

export const contract_abi_supplychain = [
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": false,
				"internalType": "string",
				"name": "name",
				"type": "string"
			},
			{
				"indexed": false,
				"internalType": "address",
				"name": "ownerId",
				"type": "address"
			},
			{
				"indexed": false,
				"internalType": "address",
				"name": "labelId",
				"type": "address"
			}
		],
		"name": "LabelAdded",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": false,
				"internalType": "string",
				"name": "name",
				"type": "string"
			},
			{
				"indexed": false,
				"internalType": "address",
				"name": "ownerId",
				"type": "address"
			},
			{
				"indexed": false,
				"internalType": "address",
				"name": "productId",
				"type": "address"
			}
		],
		"name": "ProductAdded",
		"type": "event"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "addr",
				"type": "address"
			},
			{
				"internalType": "enum relation",
				"name": "r",
				"type": "uint8"
			}
		],
		"name": "Get_Handshaker",
		"outputs": [
			{
				"internalType": "contract Handshaker",
				"name": "handshaker",
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
			},
			{
				"internalType": "string",
				"name": "_imageCid",
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
			},
			{
				"internalType": "string",
				"name": "_imageCid",
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
			},
			{
				"internalType": "string",
				"name": "_ipfsAddress",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "_iamgeCid",
				"type": "string"
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
				"internalType": "string",
				"name": "imageCid",
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



export const contract_abi_linker = [
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "_supplychainId",
				"type": "address"
			}
		],
		"stateMutability": "nonpayable",
		"type": "constructor"
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
		"inputs": [
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