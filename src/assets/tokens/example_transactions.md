
# An XML tool for TokenScript

This document describes a tool that does xml stuff for TokenScript, which is in XML.

This is part of the tokenscript tool kit. There are other tools work on a higher level, like validating if the contracts in the TokenScript is correctly implemented and has the right interface, or automatically generating the TokenScript based on some contract JSON data set. Those tools are integral to TokenScript workmanship but not included in this document.

The tool, which I call xmlsec for now, has 4 sub commands.

````
$ java -jar xmlsec.jar val tokenscript.xml
$ java -jar xmlsec.jar  sign [-o tokenscript.tsml | -d output.dir/] tokenscript.xml
$ java -jar xmlsec.jar c14n [-o tokenscript.tsml | -d output.dir/] tokenscript.xml
$ java -jar xmlsec.jar verify tokenscript.xml
````

The first and last commands also have a long form (validate and canonic, respectively). The second and the third command has a mandatory -o parameter.

## Each sub-commands has their own parameters

For example, `sign` has `--key`

## Multi file processing

It should be possible to process multiple files in all of the commands. For example:

````
$ java -jar xmlsec.jar val */*.xml
````

Which validates every XML files under every directory.

For the commands that has an output, either `-o` or `-d` should be used. But if there are multiple input file, then only `-d` is allowed. `-d` causes the output of the same filename under the directory specified.

## Multi-command processing

It should be possible to concatenate commands. The most typical use-cases are:

````
$ java -jar xmlsec.jar val c14n sign verify my.tokenscript.xml
````

This causes the tokenscript file to be validated, canonicalized, signed and verified. If one of the sub-command fails, the next one is not executed, but rather the next file is processed.


## other requirements

- The code should be written with Java 11 as it is the default platform of†

The approach I would take is:

1. Fork xmlsectool 3.0.0†
2. Add two sub-commands: val and c14n support‡
3. Change commandline syntax from `--sign` and `--verify` to just `sign` and `verify`
4. Add multi-file processing
5. Add multi-command processing

† 3.0.0 is an in-development version expected to come out in 2021 but 2.0.0 the current stable has very old libraries and has bugs with some of our processes. As a result of this approach, the code should be written with Java 11 as it is the default platform of xmlsectool Please try to use the latest Java API as backward compatibility is not desired.

‡ The current xmlsectool supports validation already, but it might not be using Xerces with Schema 1.1 support. Xerces seem to be the only one that can validate files that has entity references, which we need.

It is desirable to keep the possibility to sync up with future releases of xmlsectool, so you might choose to add instead of replace (e.g. add a sub command to validation with Xerces instead of replacing what was there), and use sub-classing instead of changing much of the source code. 

## Withdraw Liquidity
0xeeeb206a2cc9eba150c036cde950c19ef04fa312755f4f5925c165efe90934f0
0x26aad4d82f6c9fa6e34d8c1067429c986a055872 (CoFiXRouter)

## Approve XT-1 (in preparation for withdrawing liquidity)
0xb98655b9fabb127809b9915ae2ee4a71874c986120571bd5af1d04fd35524a2f
0xb2b7bedd7d7fc19804c7dd4a4e8174c4c73c210d (ETH/USDT Pair)
spender=0x26aaD4D82f6c9FA6E34D8c1067429C986A055872 (CoFiXRouter)

## Withdraw XT-1 token from the mining pool
0x0a1c9ea017b0139cbdc5e7b330509fc715005833e24b29d4c64e6c91f2d3c4c4
0x3b67fe44216d3e147ba8ccf6e49d2e576441cb10 (CoFiXStakingRewards for ETH/USDT Pair)
from=0x3b67fe44216d3e147ba8ccf6e49d2e576441cb10 (same contract)
to=0x9cf7dd4bc32cd2429ca86646a4a4c6bff91a1103 (ownerAddress)

## Staking Cofi token
0xa7c3a15bd48f72b59df2afe30f78bc6c71e200cec50552d81946f48badadd64e
0x0061c52768378b84306b2665f098c3e0b2c03308
from=0x9cf7dd4bc32cd2429ca86646a4a4c6bff91a1103 (ownerAddress)
to=0x0061c52768378b84306b2665f098c3e0b2c03308

