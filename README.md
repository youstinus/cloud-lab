## Clouds, Containers and Code laboratorinis darbas
Laboratorinio darbo tikslas - paleisti savo mikroservisą Kubernetes clusteryje, kuris yra Microsoft Azure Cloude (AKS).

Laboratorinio darbo žingsniai ir įvertinimas už kiekvieną žingsnį yra žemiau.

1. Gitlab repo paruošimas (3 balai)
    1. Susigeneruokite ssh rsa public ir private raktų porą panaudodami `ssh-keygen` programą terminale
       ```
        $ ssh-keygen
       ```
    2. Public key įdėti į savo github paskyrą
    3. Sukurkite duotos github repo fork’ą su savo github paskyroje - **1 balas**
    4. Nusiklonuokite savo nuforkintą github repo lokaliai su git clone. Visi kodo pakeitimai bus daromi lokaliai
    5. Sukurtame forke įjungti ir sukonfigūruoti Github Actions. Action'as konfigūruojasi paprastai,
       sukurkite aplanką `.github/workflows`, į jį pamodifikavę (pakeisti <JŪSŲ DOCKERHUB USERNAME> į savo) įdėkite failą parodytą žemiau. 
       Failo pavadinimas turi būti **release.yml** - **2 balai**
       ```yaml
       name: Publish Release
       
       on:
         release:
           types: [published]
       
       jobs:
         build:
       
           runs-on: ubuntu-latest
       
           steps:
             - uses: actions/checkout@v1
             - name: Define vars
               run: |
                 echo ${{ github.ref }} | cut -d '/' -f 3 > DOCKER_TAG
             - name: Build and push docker image
               run: |
                 docker build --tag <JŪSŲ DOCKERHUB USERNAME>/cloud-lab:$(cat DOCKER_TAG) .
                 docker login --username ${{ secrets.DOCKER_USER }} --password ${{ secrets.DOCKER_TOKEN }}
                 docker push <JŪSŲ DOCKERHUB USERNAME>/cloud-lab:$(cat DOCKER_TAG)
       ```
    6. Sukonfigūruokite du secret environment variables Github’e 
          1. DOCKER_TOKEN – dockerhub personal token
          2. DOCKER_USER –  dockerhub username 
    7. **Pakeitimus išsaugokite savo github repozitorijoje panaudojant git commit ir git push**
    
2.  Docker HUB paruošimas (1 balas)
    1. Sukurkite repozitoriją "cloud-lab" - **1 balas**
    2. Sugeneruokite personal access token'ą ir išsaugoti vėlesniam panaudojimui
    
3. Github repo forko integracija su Kubernetes clusteriu
   1. Parsisiųskite kubeconfig'ą su komanda: `curl -X GET -L0 -s https://b79d2d57-c967-4074-948e-3ad103dccedb.lab.cloudcat.online/<JŪSŲ kubernetes namespace vardas>`
   1. Sukonfigūruokite du secret environment variables Github’e 
      1. DOCKER_TOKEN – dockerhub personal token
      2. DOCKER_USER –  dockerhub username
4. API serviso pakeitimai ir automatinis deploymentas – 3 balai
   1.  Pridėti papildomą http endpointą į API servisą, kuris grąžintų studento github username SHA256 hashą (reikia tik padaryti funkciją kuri grąžins hashą, panaudojant jau egzistuojančius kriptografijos paketus)
   2.  Pakeitimus išsaugoti savo git repo su git commit ir git push
   3.  Jei viskas atlikta teisingai – pakeitimai turėtų automatiškai pasimatyti web aplikacijoje


 
        
    
   


