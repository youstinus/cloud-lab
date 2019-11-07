## Clouds, Containers and Code laboratorinis darbas
Laboratorinio darbo tikslas - paleisti savo mikroservisą Kubernetes clusteryje, kuris yra Microsoft Azure Cloude (AKS).

Laboratorinio darbo žingsniai ir įvertinimas už kiekvieną žingsnį yra žemiau.
Prieš pradėdami užsiregistruokite laboratoriniam darbui: [čia](https://b79d2d57-c967-4074-948e-3ad103dccedb.lab.cloudcat.online/)


1. Github ir Dockerhub repo paruošimas (4 balai)
    1. Susigeneruokite ssh rsa public ir private raktų porą panaudodami `ssh-keygen` programą terminale
       ```
        $ ssh-keygen
       ```
    2. Public key įdėti į savo github paskyrą
    3. Sukurkite tcentric/cloud-lab fork’ą savo github paskyroje - **2 balai**
    4. Nusiklonuokite savo nuforkintą github repo lokaliai su `git clone`. Visi kodo pakeitimai bus daromi lokaliai
    5. Sukurtame forke įjungti ir sukonfigūruoti Github Actions. Action'as konfigūruojasi paprastai,
       sukurkite aplanką `.github/workflows`, į jį įdėkite šį failą (pakeisti <JŪSŲ DOCKERHUB USERNAME> į savo) 
       Failo pavadinimas turi būti **release.yml** - **2 balai**
       **Atkreipkite dėmesį į lygiavimą** Išsaugoję failą galite pasižiūrėti ar lygiavimas tiesingas atsidarę release workflow savo github repo (github.com)
       
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

    6.  Docker HUB paruošimas - **1 balas**
        1. Sukurkite repozitoriją "cloud-lab" 
        2. Sugeneruokite personal access token'ą ir **išsaugokite vėlesniam panaudojimui**
               
    7. Sukonfigūruokite du secret environment variables Github’e 
        1. DOCKER_TOKEN – dockerhub personal token (iš prieš tai buvusio žingsnio)
        2. DOCKER_USER –  dockerhub username 
        
    8. **Pakeitimus išsaugokite savo github repozitorijoje panaudojant git commit ir git push**
             
2.  Konteinerizuotos aplikacijos paleidimas Kubernetes clusteryje (1 balas)
      1. Parsisiųskite kubeconfig'ą su komanda: `mkdir ~/.kube && curl -X GET -s https://b79d2d57-c967-4074-948e-3ad103dccedb.lab.cloudcat.online/kubeconfig/<JŪSŲ github username> > ~/.kube/config`
      2. Sukurkite naują release savo github repo, pavadinkite jį v0.1 - **1 balas**
      3. Paruoškite kubernetes manifestus (įrašyti informaciją prie TODO pažymėtų vietų) [žiūrėti čia](./infrastructure/k8s)
      4. Nusiųskite manifestus į kubernetes clusterį su komanda: `kubectl apply -f infrastructure/k8s/` **1 balas**
      5. Atskirame terminalo lange įvykdykite komandą `kubectl port-forward svc/lab 8080:8080`
      6. Naršyklėje atsidarykite: http://localhost:8080 - tai jūsų aplikacija Kuebrnetes clusteryje. Ji automatiškai tikrinis 4 etapo užduotis ir matysite, kada užduotis bus įvykdyta
   
4.  API serviso pakeitimai ir deploymentas (3 balai)
      1.  Pridėti papildomą http endpointą į API servisą /{username} [žiūrėti čia](./cmd/api.go) - **1 balas**
      2.  Naujai pridėtas endpointas turėtų grąžinti Sha256 _username_'o  hashą [žiūrėti čia](./internal/controller/controller.go)
      3.  Pakeitimus išsaugoti savo git repo su git commit ir git push
      4.  Adarykite naują release githube, pavadinkite jį **v0.2**
      5.  Po to, kai github Actions subuildins naują Docker image'ą, atnaujinkinte jį savo kubernetes deploymente su komanda:
         `kubectl set image deploy app=<jusu dockerhub username/cloud-app:v0.2` - **2 balai**


 
        
    
   


