# smajolang
> An awful compile to JS language

[![travis](https://img.shields.io/travis/ecrmnn/smajolang/master.svg?style=flat-square)](https://travis-ci.org/ecrmnn/smajolang/builds)
[![npm version](https://img.shields.io/npm/v/smajolang.svg?style=flat-square)](http://badge.fury.io/js/smajolang)
[![npm downloads](https://img.shields.io/npm/dm/smajolang.svg?style=flat-square)](http://badge.fury.io/js/smajolang)
[![npm license](https://img.shields.io/npm/l/smajolang.svg?style=flat-square)](http://badge.fury.io/js/smajolang)
[![prs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg?style=flat-square)](http://makeapullrequest.com)
[![eslint](https://img.shields.io/badge/code_style-airbnb-blue.svg?style=flat-square)](https://github.com/airbnb/javascript)

```bash

                   /ossyys/.`                      
                :ydddddhmmmmdh+.                  
              /hddmmdddmmmmmmmmmdo`               
            `odmmmmdhhhhyo/:/+sdmdy.              
            +ddmhsoooo+//:::::/+sdmd`             
           `mdmyoo+++////////////odm:             
           .dmhoo+++///////:///+++yd+             
           .mdyo+++++++//++oosso++ody             
           :mds+osyyhhysooshhyysso+dd`            
           oddo+osyydhdyo+shhdhyso+ss`            
           ooho+ooossyys+//sssso+++o+             
           .os+++++ooooo+///oo+//++o/             
            :oo+++++ossoooo+oso+++++.             
             ../+++osssyyyyyssysoo/               
               `+oosyysyyyyysyysoo:               
                :ooooooosssssooso/                
                o+osooooossooooso                 
               odoosyysoossssysodo.               
             :ohdyssssyyyhhhyssdhhyy/-.`          
        `-+shddhhddysssssyyyyyddyhymhhhys/.`      
   `-:+yhhddddhhhhddhyyyyyyyhddhhyhmhhdhddhhyo/-` 
:+syhhddddmdmdhdhhdmddhhhhhhdmdhydhhhydhddhhhhhhyo
yyhhdhddddmdmdhmdmNmmddddddmmmNdydhhdydhddddhddhhh
yhhdddhddddddmddmmdmdmNmdhddddmmmmhhdhhhhddddhdhhh
yhhhhdhdddhdddddddmddddmmddddmddmmhhddhhhddddhhhhd
```

### Installation
```bash
npm install --global smajolang
```

### Syntax
- Identical with JS, but all variables must include the word `smajo`
  - E.g. valid names `smajo`, `smajolini`, `kjekkSmajoKul`, `$smajo$`
  - E.g. invalid names `name`, `smaj`, `smajs`, `hello`

### Usage
- Make new directory
- Create `.smajorc` JSON file with `rootDir` and `outDir`
- Build your project in `rootDir`
- Run `smajo build` to compile to JS

### License
MIT © [Daniel Eckermann](http://danieleckermann.com)