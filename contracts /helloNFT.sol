// SPDX-License-Identifier: MIT
pragma solidity ^0.8.18;

import "erc721a/contracts/ERC721A.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract helloNFT is ERC721A, Ownable {
    uint256 public totalMinted;
    mapping(uint256 => string) private _nftMetadata;
    mapping(uint256 => string) private _nftPrompts;

    // Constructor initializing the NFT collection with a name and symbol
    constructor() ERC721A("hello", "hlo") Ownable(msg.sender) {
        totalMinted = 0;
    }

    // Function to batch mint NFTs with corresponding metadata and prompts
    function mintMultipleNFTs(string[] memory metadataURIs, string[] memory descriptions) external onlyOwner {
        require(metadataURIs.length == descriptions.length, "Arrays have the same length");

        uint256 startId = totalMinted;
        uint256 numOfNFTs = metadataURIs.length;

        // Mint the specified number of NFTs to the contract owner
        _safeMint(owner(), numOfNFTs);

        // Assign metadata and prompts to each newly minted NFT
        for (uint256 i = 0; i < numOfNFTs; i++) {
            _nftMetadata[startId + i] = metadataURIs[i];
            _nftPrompts[startId + i] = descriptions[i];
        }

        totalMinted += numOfNFTs;
    }
    
    // Function to return the prompt description of a given token ID
    function promptDescription(uint256 tokenId) external view returns (string memory) {
        require(_exists(tokenId), "Prompt query for nonexistent token");
        return _nftPrompts[tokenId];
    }

    // Override function to return the metadata URI of a given token ID
    function tokenURI(uint256 tokenId) public view override returns (string memory) {
        require(_exists(tokenId), "ERC721Metadata: URI query for nonexistent token");
        return _nftMetadata[tokenId];
    }    
}
