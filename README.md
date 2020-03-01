<h1> Pata Marca - Gerenciador de banho e tosa </h1>

<h2>1. Introdução</h2>
<div style="text-align: justify">
    <p>
        Esse projeto consiste na criação do sistema web e mobile (Pata Marca) de gerenciamento de banhos e tosas, no pet shop. Onde os clientes têm a oportunidade de acompanhar as etapas de atendimento em seu animal de estimação. 
        Por tanto, foi desenvolvido dois sistemas: web e mobile, cada um, com as suas devidas particularidades. O sistema mobile acessado pelo cliente e o sistema web acessado pelo pet shop. 
        Com uma API criada específicamente para efetuar a comunicação entre ambas as plataformas.
    </p>
</div>

Informações sobre cada plataforma:

*  **API:** Desenvolvida em GraphQL; 
*  **Web:** Desenvolvido em React JS;
*  **Mobile:** Desenvolvido em React Native com o Expo.

<h2>2. Objetivo</h2>
<div style="text-align: justify">
    <p>
        Essa ferramenta tem como objetivo facilitar a comunicação entre o cliente e o pet shop no atendimento dos pets.
    </p>
</div>


<h2>3. Justificativa</h2>
<div style="text-align: justify">
    <p>
        Surgiu o interesse pelo desenvolvimento do projeto, como opção para agilizar e facilitar o atendimentos dos pets e incrementar a relação do cliente com a empresa, atingindo uma prestação de serviços de qualidade e com aproveitamento significativo, em todas as áreas de atendimento.
    </p>
</div>

<h2>4. Pata Marca</h2>
<div style="text-align: justify">
    <p>
        Nas seções a seguir serão apresentados, os requisitos funcionais, os requisitos não funcionais e o diagrama ER para uma melhor compreensão do sistemas e suas particularidades.
    </p>
</div>

**4.1. Requisitos funcionais**

**Web:** 
* Confirmar agendamentos;
* Informar o cliente sobre as etapas do atendimento.

**Mobile:** 
* Solicitar agendamento;
* Gerenciar pet;
* Acompanhar as etapas do atendimento.

**Web e mobile:** 
* Efetuar login;
* Gerenciar usuário;
* Integrar com API.

**4.2. Requisitos não funcionais**
* Utilizar linguagem de programação JavaScript;
* Ter acesso à internet.

**4.3. Diagrama ER** <br />
<div style="text-align: justify">
    O digrama ER representado na Figura 1 revela que o sistema está dividido em 4 tabelas no banco de dados. As tabelas "service" e "pet" são as que tem maior movimentação no banco de dados.
</div>

<p align="center">
    <img src="/uploads/1d25e074b8aba4d9625d24cf7eadd518/ModeloER.png" alt="Modelo ER" />
    <h4>Figura 1. Modelo ER</h4>
</p>

<h2>5. Projetos que usam a API em GraphQL:</h2>

Link para a parte Web do sistema: [Pata Marca Web](https://gitlab.com/senac_pos-tcc_desenvolvimento-web-mobile-2019/projeto_tcc-7/pata-marca-web)

Link para a parte Mobile do sistema: [Pata Marca Mobile](https://gitlab.com/senac_pos-tcc_desenvolvimento-web-mobile-2019/projeto_tcc-7/pata-marca-mobile)

