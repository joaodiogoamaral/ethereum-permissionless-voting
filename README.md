

This is a simple DAPP based on Ethereum (Solidity) which is interacted by means of a React JS frontend. The DAPP was developped using Truffle (a framework to speed up DAPP development on Ethereum). The DAPP is still in development stage and thus not yet prepared to run on Ethereum Mainnet, so it uses an Ethereum development blockchain instead.

1 - Prerequisites

To run this DAPP, it is necessary to have Ganache running (Ganache is a Blockchain Emulator that runs on localhost address), so that the App can connect to its blockchain. 

To USE the DAPP, it is necessary to have Metamask (or other Ethereum provider) installed, and configured to use one of the account addresses that are deployed on the Ganache Emulated Blockchain. 


2 - App flow 

The app is very simplistic, assuming that the Etherum provider is configured with an address that has sufficient ETH available for the GAS costs of a vote.

If there are sufficient funds, then the user can click to vote on his/her favourite Family Guy character, which will open a prompt on the Ethereum Wallet, asking for confirmation. Once the vote is confirmed, the number of votes on that candidate will be incremented.




3 - Future Enhancements

	- Limit the number of votes per Voter. -> DONE!
	- Release a new version where the DAPP will create addresses and distribute funds for voting, similar to an actual election, where only a limited set of people can vote.
	



