#!/bin/bash

TEST_DIR=$PWD
DATA_DIR=$TEST_DIR/test-data
BRANCH='meme-dev'

echo 'Cloning repos...'
git clone -b $BRANCH https://github.com/memecosmos/meme-node.git $DATA_DIR/meme-node
git clone -b $BRANCH https://github.com/memecosmos/meme-builders.git $DATA_DIR/meme-builders

echo 'Building node...'
# set default GO env variables for git actions testing
[[ -z "${GOPATH}" ]] && export GOPATH=/home/runner/go
export PATH=$PATH:$(go env GOPATH)/bin
cd $DATA_DIR/meme-node
make install

cd $TEST_DIR
cp $TEST_DIR'/root-node.local.env' $DATA_DIR'/meme-builders/docker/root-node/root-node.local.env'

echo 'Editing init-root.sh...'
if [[ "$OSTYPE" == "darwin"* ]]; then
    sed -i '' -e 's/keyring-backend os/keyring-backend test/g' $DATA_DIR'/meme-builders/docker/root-node/scripts/init-root.sh'
else
    sed -i -e 's/keyring-backend os/keyring-backend test/g' $DATA_DIR'/meme-builders/docker/root-node/scripts/init-root.sh'
fi
# injecting code to add accounts to genesis.
# dev: how to format? - replace new lines with "\n" and escape "&"
ADD_ACC_TEXT='# add testing accounts\necho "${ACCOUNT1_MNEMONIC}" | memed keys add account1 --keyring-backend=test --recover |\& tee "${MEME_HOME}/account1.wallet"\nchmod 600 "${MEME_HOME}/account1.wallet"\naccountAddress=$(echo "${ACCOUNT1_MNEMONIC}" | memed keys show account1 -a --keyring-backend test)\nmemed add-genesis-account $accountAddress "${ACCOUNT_BALANCE}${BOND_DENOM}"\n\necho "${ACCOUNT2_MNEMONIC}" | memed keys add account2 --keyring-backend=test --recover |\& tee "${MEME_HOME}/account2.wallet"\nchmod 600 "${MEME_HOME}/account2.wallet"\naccountAddress=$(echo "${ACCOUNT2_MNEMONIC}" | memed keys show account2 -a --keyring-backend test)\nmemed add-genesis-account $accountAddress "${ACCOUNT_BALANCE}${BOND_DENOM}"\n\necho "${ACCOUNT3_MNEMONIC}" | memed keys add account3 --keyring-backend=test --recover |\& tee "${MEME_HOME}/account3.wallet"\nchmod 600 "${MEME_HOME}/account3.wallet"\naccountAddress=$(echo "${ACCOUNT3_MNEMONIC}" | memed keys show account3 -a --keyring-backend test)\nmemed add-genesis-account $accountAddress "${ACCOUNT_BALANCE}${BOND_DENOM}"\n\necho "${ACCOUNT4_MNEMONIC}" | memed keys add account4 --keyring-backend=test --recover |\& tee "${MEME_HOME}/account4.wallet"\nchmod 600 "${MEME_HOME}/account4.wallet"\naccountAddress=$(echo "${ACCOUNT4_MNEMONIC}" | memed keys show account4 -a --keyring-backend test)\nmemed add-genesis-account $accountAddress "${ACCOUNT_BALANCE}${BOND_DENOM},${ACCOUNT_BALANCE}memeAdmin"\n\necho "${ACCOUNT5_MNEMONIC}" | memed keys add account5 --keyring-backend=test --recover |\& tee "${MEME_HOME}/account5.wallet"\nchmod 600 "${MEME_HOME}/account5.wallet"\naccountAddress=$(echo "${ACCOUNT5_MNEMONIC}" | memed keys show account5 -a --keyring-backend test)\nmemed add-genesis-account $accountAddress "${ACCOUNT_BALANCE}${BOND_DENOM}"\n\necho "${ACCOUNT6_MNEMONIC}" | memed keys add account6 --keyring-backend=test --recover |\& tee "${MEME_HOME}/account6.wallet"\nchmod 600 "${MEME_HOME}/account6.wallet"\naccountAddress=$(echo "${ACCOUNT6_MNEMONIC}" | memed keys show account6 -a --keyring-backend test)\nmemed add-genesis-account $accountAddress "${ACCOUNT_BALANCE}${BOND_DENOM}"\n\necho "${ACCOUNT7_MNEMONIC}" | memed keys add account7 --keyring-backend=test --recover |\& tee "${MEME_HOME}/account7.wallet"\nchmod 600 "${MEME_HOME}/account7.wallet"\naccountAddress=$(echo "${ACCOUNT7_MNEMONIC}" | memed keys show account7 -a --keyring-backend test)\nmemed add-genesis-account $accountAddress "${ACCOUNT_BALANCE}${BOND_DENOM}"\n\necho "${ACCOUNT8_MNEMONIC}" | memed keys add account8 --keyring-backend=test --recover |\& tee "${MEME_HOME}/account8.wallet"\nchmod 600 "${MEME_HOME}/account8.wallet"\naccountAddress=$(echo "${ACCOUNT8_MNEMONIC}" | memed keys show account8 -a --keyring-backend test)\nmemed add-genesis-account $accountAddress "${ACCOUNT_BALANCE}${BOND_DENOM}"'
# skip adding accounts if re-run tests without clearing the temp local test storage
if !grep "# add testing accounts" $DATA_DIR'/meme-builders/docker/root-node/scripts/init-root.sh' &>/dev/null; then
    if [[ "$OSTYPE" == "darwin"* ]]; then
        sed -i '' -e "/\"\${FAUCET_BALANCE}\${BOND_DENOM}\"/{
            $!N
            s^fi^fi\n\n${ADD_ACC_TEXT}^
        }" $DATA_DIR'/meme-builders/docker/root-node/scripts/init-root.sh'
    else
        sed -i -e "/\"\${FAUCET_BALANCE}\${BOND_DENOM}\"/{
            $!N
            s^fi^fi\n\n${ADD_ACC_TEXT}^
        }" $DATA_DIR'/meme-builders/docker/root-node/scripts/init-root.sh'
    fi
fi

echo 'Starting the node in background...'
cd $DATA_DIR'/meme-builders/tools-nodejs/init-local-node-without-docker'
chmod u+x init.sh
source ./init.sh 2>node.output &

cd $TEST_DIR
