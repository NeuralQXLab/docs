# Using Cholesky

Cholesky is the local computational cluster at CPHT.

The official documentation is at [this link](https://docs.idcs.mesocentre.ip-paris.fr). 
You should read the section about Cholesky once, especially the part about the different queues and resources available.

## Getting access

[Full documentation](https://phymath.gitlab.labos.polytechnique.fr/docs/en/phymath/cpht/account/)

 1. To get access **you must have an account on Ecole Polytechnique's XAJAM Directory (or Annuaire)**.
   - If you are a student or have a work contract with Ecole Polytechnique, you have one such account and it will be `name.surname` .
   - If you do not know if you have one or not, try to login [here](https://annuaire.polytechnique.fr).
   - If you don't get in touch with _Florence Auger_ or _Malika Lang_ to get it sorted out.

   > :warning: **If you are a PSC student/Intern/not stagiare**: You must be associated to CPHT. To do so, you must **send me an email** in order to ask me to affiliate you to the CPHT database. The email should be 4 lines:
   >   1. "Please add me to CPHT Xajam"
   >   2. Name, Surname, email address @polytechnique.edu or alternatively XAJAM username
   >   3. Begin and end date of affiliation (begin date can be today, end date can easily be approxiamte and in excess. Better later than earlier)
   >   4. 1 line about reason so that I can fill the form, ideally in french (visiting student from [institution] in the cadre of [project], students for [activity], etc...)

   > :warning: Make sure that you setup your XAJAM password. The first time you login, you might need to reset your password by going to [this link](https://annuaire.polytechnique.fr/password/?p=password&lan=en).

  
2. After you have done the above, and after you have received an automated email by XAJAM notifying that you have been affiliated to CPHT, you must ask me to create you an account on Cholesky. To do so, send me an email as such:
  >  Subject: Cholesky account creation
  >  Content: My polytechnique email address is [name.surname@polytechnique.edu]
If you want to speed me up, you can also come see me right after sending that email. I will then proceed to add you to the database in [NDQM](https://gitlab.idcs.polytechnique.fr/ip-paris/idcs/poles/hpc/cholesky/projects/ndqm/-/blob/master/projet.json) or [MLQE](https://gitlab.idcs.polytechnique.fr/ip-paris/idcs/poles/hpc/cholesky/projects/mlqe/-/blob/master/projet.json) and create your account.

3. You need to setup passwordless SSH KEY authentication. To do so:

    1. If you don't have an ssh key pair, generate one by following the instructions on the[CPHT website "I don't have SSH key pair" section](https://phymath.gitlab.labos.polytechnique.fr/docs//en/phymath/cpht/workstation/remote/#you-dont-have-a-ssh-key-pair) (scroll down for the instructions for windows).
         - For the love of god, do not use a secret passphrase to encrypt your ssh keys unless you know what you are doing.
     2. As they explain in the documentation at the link above, send an email from your `name.surname@polytechnique.edu` email address to [the email address listed here](https://phymath.gitlab.labos.polytechnique.fr/docs/en/phymath/cpht/) with the following content (replace content within square brakets with the correct things)
    ```Subject: Configuration de l'authentification par clé publique
    Bonjour,
    Veuillez trouver ci-dessous la clé publique que j'aimerais associer à mon compte afin de me connecter à Cholesky pour mes recherches en collaboration avec Filippo.

    Username: [name.surname]
    Public key:
    [ssh-ed25519 ZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZ filippo.vicentini@laptop.local]


    Cordialement,
    [Name, Surname]
    ```

4. If you are on Mac/Linux, add the following lines to the file `~/.ssh/config` (if the file does not exist, create it)
    ```
    Host pascal
        Hostname pascal.cpht.polytechnique.fr
        User [username, probably name.surname]
        DynamicForward 9156
        
        # Access to JupyterHub on Idris
        # LocalForward 7008 jupyterhub.idris.fr:443

    Host cholesky*
        Hostname cholesky-login.mesocentre.idcs.polytechnique.fr
        User [username, probably name.surname]
        IdentityFile [path to the ssh key, if you followed the tutorial, probably ~/.ssh/id_ed25519]
        ProxyJump pascal

    Host cholesky
    ```

 5. Now you can connect with the ssh commands described in [this part of the documentation](https://phymath.gitlab.labos.polytechnique.fr/docs//en/phymath/cpht/workstation/remote/#you-have-a-ssh-key-pair).
    - From mac/linux you should now be able to connect by simply running `ssh cholesky` from your terminal.
    - You should also be able to remotely connect via ssh to `cholesky` by using VSCode, which I highly reccomend.


## Modules for Python and Jax

To use Python and Jax on Cholesky you should remember the following general instructions:
 - **do not** use Anaconda. You will have random problems and lose time.
 - **do create** environments with **MAMBA** and **MAMBFORGE**.
   - `mamba` is a replacement for `conda` that avoids issues.
 - **do not** install packages using `mamba/conda`. Never ever.
 - **do install** packages with `pip`.
   - if you are experienced and like using other package managers like `pipx`, `poetry`, `hatch` and so on, feel free.
 - **module import order matters**: some things might break if you change the order in which you import or load modules. Be careful if you change the instructions below.

With those general instructions, the ideal way to use Cholesky for us is the following:
 - load the **MAMBAFORGE** package with `modules load mambaforge`
   - I suggest you add this line to your `.bash_profile` so that it is always executed when you connect to the cluster
 - Create python environemnts with `mamba create --name ENV_NAME python=3.11` where `ENV_NAME` is the name of the environment (keep it short!) and `python=3.11` is the python version you want to use. Try to use at least 3.11.

