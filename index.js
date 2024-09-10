#!/usr/bin/env node

const { Command } = require("commander");
const program = new Command();
require("dotenv").config();

const package = require("./package.json");
const { Ocra } = require("./src/modules/ocra/ocra");

function collect(value, previous) {
  const values = value.split(",").map((v) => v.trim());
  return previous.concat(values);
}

program.version(package.version);

program
  .command("ocra")
  .description("Gera um OTP usando Ocra")
  .argument(
    "<key>",
    "String que representa o nome da chave compartilhada entre as partes"
  )
  .argument(
    "<challenger>",
    "String que representa o challenger a ser passado para o Ocra - Limite: 128 bytes"
  )
  .argument("<suite>", "String contendo a suite de operações OCRA.")
  .option(
    "-len <length>",
    "Tamanho do OTP gerado - aplicar valores entre 6 e 8"
  )
  .option("-c <counter>", "Contador sincronizado entre as partes.") // Também corrigi os outros que faltavam o valor
  .option(
    "-ph <hash>",
    "String que contém um hash conhecido entre as partes durante a execução do algoritmo"
  )
  .option(
    "-s <session>",
    "Conjunto de strings que contem informações sobre a sessão em encoding ascii. - Limite: 512 bytes"
  )
  .option(
    "-ts <timestamp>",
    "Número de intervalos de tempo (segundos, minutos, horas ou dias, dependendo da granularidade especificada) desde a meia-noite UTC de 1º de janeiro de 1970 [UT]."
  )
  .action(async (key, challenger, suite, options) => {
    const ocra = new Ocra(
      key,
      challenger,
      suite,
      options.Len,
      options.c,
      options.Ph,
      options.s,
      options.Ts
    );

    const otp = await ocra.ocraGen();

    console.log(`OTP: ${otp}`);
    process.exit(0);
  });

program
  .command("getShadow")
  .argument("<pin>", "PIN do cartão. Deve ser uma string numérica ASCII.")
  .description("Lê um cartão à partir de um dispositivo de leitura homologado")
  .action((readCard) => console.log(readCard));

program
  .command("setNsAuth")
  .description("Altera o estado do hsm Dinamo")
  .option(
    "-acl",
    "Conjunto de valores permitidos para controle de acesso",
    collect,
    []
  )
  .option(
    "-shadow",
    "Shadown necessárias para reconstruir a Server Master Key",
    collect,
    []
  )
  .action((setNsAuth) => console.log(setNsAuth));

program.parse();
