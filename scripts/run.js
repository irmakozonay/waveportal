const main = async () => {
  const waveContractFactory = await hre.ethers.getContractFactory("WavePortal");
  const waveContract = await waveContractFactory.deploy({
    value: hre.ethers.utils.parseEther("0.01"),
  });
  await waveContract.deployed();
  console.log("Contract addy:", waveContract.address);

  let contractBalance = await hre.ethers.provider.getBalance(
    waveContract.address
  );

  console.log(
    "Contract balance:",
    hre.ethers.utils.formatEther(contractBalance)
  );

  let waveCount;
  waveCount = await waveContract.getTotalWaves();
  console.log(waveCount.toNumber());

  /**
   * Let's send a few waves!
   */
  let waveTxn = await waveContract.wave("A message!");
  await waveTxn.wait(); // Wait for the transaction to be mined

  contractBalance = await hre.ethers.provider.getBalance(waveContract.address);
  console.log(
    "Contract balance2:",
    hre.ethers.utils.formatEther(contractBalance)
  );

  const [_, randomPerson] = await hre.ethers.getSigners();
  waveTxn = await waveContract.connect(randomPerson).wave("Another message!");
  await waveTxn.wait(); // Wait for the transaction to be mined

  waveTxn = await waveContract.connect(randomPerson).wave("Another message2!");
  await waveTxn.wait(); // Wait for the transaction to be mined

  contractBalance = await hre.ethers.provider.getBalance(waveContract.address);
  console.log(
    "Contract balance3:",
    hre.ethers.utils.formatEther(contractBalance)
  );

  let allWaves = await waveContract.getAllWaves();
  //console.log(allWaves);
};

const runMain = async () => {
  try {
    await main();
    process.exit(0); // exit Node process without error
  } catch (error) {
    console.log(error);
    process.exit(1); // exit Node process while indicating 'Uncaught Fatal Exception' error
  }
  // Read more about Node exit ('process.exit(num)') status codes here: https://stackoverflow.com/a/47163396/7974948
};

runMain();
