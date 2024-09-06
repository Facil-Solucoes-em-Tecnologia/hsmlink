#!/usr/bin/env node

const { program } = require("commander");
const package = require("./package.json");

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
  .option("-len", "Tamanho do OTP gerado - aplicar valores entre 6 e 8")
  .option("-c", "Contador sincronizado entre as partes.")
  .option(
    "-ph",
    "String que contém um hash conhecido entre as partes durante a execução do algoritmo"
  )
  .option(
    "-s",
    "Conjunto de strings que contem informações sobre a sessão em encoding ascii. - Limite: 512 bytes"
  )
  .option(
    "-ts",
    "Número de intervalos de tempo (segundos, minutos, horas ou dias, dependendo da granularidade especificada) desde a meia-noite UTC de 1º de janeiro de 1970 [UT]."
  )
  .action((ocra) => console.log(ocra));

// program
//   .command("phgenerate")
//   .description("Gera um hash usando função de HMAC")
//   .argument("<key>", "chave de HMAC usada para gerar o hash")
//   .argument("<hash_mode>", "dados passados para criação do hash")
//   .action((phgenerate) => console.log(phgenerate));

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
