# DesafioSofit
Desafio realizado para a empresa Sofit


## Desafio

Sua jornada inicia aqui aventureiro. E aqui estão as instruções:
Seu identificador único é xxxxxxxxxxxxxxxxxxxx. Ele será usado em todo o desafio que se seguirá.

Seu objetivo é: Calcular o saldo do tanque de combustível de um veículo levando em consideração os abastecimentos e viagens para cada dia de um período. Ou seja, você terá que descobrir quanto combustível havia no tanque do veículo em cada dia.

Para isso você deve usar os dados disponibilizados nas seguintes URL's:

GET /data/{SEU-ID}/prices: Retorna um array com as datas de alteração do preço do combustível.
GET /data/{SEU-ID}/supplies: Retorna um array com datas e abastecimentos do veículo em reais (não em litros).
GET /data/{SEU-ID}/spents: Retorna um array com datas e uso do veículo em quilômetros (quilometragem percorrida no dia).
O seu veículo possui um consumo estimado de 9km/l.

Explicação:

Dadas as seguintes entradas:

### prices
```
[
   {
    "date": "11/01/2017",
    "value": 4.96
   },
   {
    "date": "12/01/2017",
    "value": 3.44
   }
]
```

### supplies
```
[
   {
    "date": "11/01/2017",
    "value": 149.47
   },
   {
    "date": "13/01/2017",
    "value": 108.89
   }
]	
```

### spents
```
[
   {
    "date": "11/01/2017",
    "value": 155.124
   },
   {
    "date": "14/01/2017",
    "value": 383.448
   }
]
```
Para cada abastecimento, você deverá descobrir quantos litros foram adicionados com base no valor vigente do combustível na data do abastecimento.
Exemplo: no dia 11/01/2017, o valor do combustível era R$ 4,96 o litro. O valor total do abastecimento foi de R$ 149,47. Ou seja, foram abastecidos 30.13 litros.

Para cada uso do veículo, você deverá calcular a quantidade de combustível gasta levando em consideração o consumo estimado.
Exemplo: No dia 11/01/2017 o veículo percorreu 155.1 km. Como o consumo estimado do veículo é de 12 km/l (no exemplo), conclui-se que o veículo gastou 12.92 litros de combustível.

Após calcular o saldo de todos os dias você deverá enviar o resultado para a API: POST /check?id=SEU-ID. No exemplo, o payload enviado foi:
```
 [
   {
    date: '11/01/2017',
    value: 17.208
   },
   {
    date: '12/01/2017',
    value: 17.20
   },
   {
    date: '13/01/2017',
    value: 48.86
   },
   {
    date: '14/01/2017',
    value: 16.90
   }
 ]
 ```

Essa API irá retornar o quão próximo você está da resposta correta. No exemplo, o resultado retonardo foi 1, ou seja 100% dos valores estão corretos.

Dicas importantes:

Salve os dados de prices, supplies e spents em arquivos locais se quiser economizar tempo, já que serão dados bem grandes.
Mesmo que não hajam abastecimentos ou gastos em um dia você deve informar o saldo para o mesmo em seu resultado final.
Arredonde todos os valores para 2 casas decimais.
Você pode gerar os dados novamente passando ?reload=true nesta mesma página.
Você pode chamar a API de verificação quantas vezes quiser, o maior resultado será o que prevalecerá.
Não desista 🙂
Você pode ver sua colocação no ranking geral acessando /rank ou o seu progresso em /progress/[SEU-ID]

Boa sorte aventureiro! Estaremos esperando você do outro lado! 💪 😆

Feito com ❤ pela equipe da Sofit Software.
