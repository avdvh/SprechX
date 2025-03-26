from bip32 import BIP32
from mnemonic import Mnemonic
import binascii

def get_seedhex_from_seedphrase(
    seed_phrase: str,
    passphrase: str,
    index: int,
    is_testnet: bool
) -> str:
    
    if not seed_phrase:
        return None, "seedphrase must be provided"

    try:
        mnemonic = Mnemonic("english")

        if not mnemonic.check(seed_phrase):
            print("Invalid mnemonic seed phrase")
        
        seedbytes = mnemonic.to_seed(seed_phrase, passphrase)

        # Initialize BIP32 with appropriate network
        network = "test" if is_testnet else "main"
        bip32 = BIP32.from_seed(seedbytes, network=network)

        # Derive the key path: m/44'/0'/index'/0/0
        # Note: in BIP32, hardened keys are represented with index + 0x80000000
        path = f"m/44'/0'/{index}'/0/0"
        seedkeybytes = bip32.get_privkey_from_path(path)
        seedkeyhex = binascii.hexlify(seedkeybytes)
        
        return seedkeyhex

    except Exception as e:
            return None, f"Error converting seedphrase to seedhex: {str(e)}"
        
if __name__ == "__main__":
    print("user this to generate seedhex from seedphrase...")