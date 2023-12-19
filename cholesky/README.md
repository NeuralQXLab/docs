# Using Cholesky

Cholesky is the local computational cluster at CPHT.

The official documentation is at [this link](https://docs.idcs.mesocentre.ip-paris.fr). 
You should read the section about Cholesky once, especially the part about the different queues and resources available.

## Getting access

[Full documentation](https://phymath.gitlab.labos.polytechnique.fr/docs/en/phymath/cpht/account/)

To get access you must have an account on Ecole Polytechnique's XAJAM Directory (or Annuaire). 
If you do not know if you have one or not, try to login [here](https://annuaire.polytechnique.fr). 
If you don't get in touch with _Florence Auger_ or _Malika Lang_ to get it sorted out.

The first time you login, you might need to reset your password. The link is [here](https://annuaire.polytechnique.fr/password/?p=password&lan=en).

Once you are in the annuaire, you need to setup passwordless SSH KEY authentication. To do so, follow the
instructions on the [CPHT website "I don't have SSH key pair" section](https://phymath.gitlab.labos.polytechnique.fr/docs//en/phymath/cpht/workstation/remote/#you-dont-have-a-ssh-key-pair)

 - For the love of god, do not use a secret passphrase to encrypt your ssh keys unless you know what you are doing.

Now you can connect with the ssh commands described in [this part of the documentation](https://phymath.gitlab.labos.polytechnique.fr/docs//en/phymath/cpht/workstation/remote/#you-have-a-ssh-key-pair).

 - You should setup your `.ssh/config` file to allow fast, easy access to Cholesky as described in the documentation above.


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

