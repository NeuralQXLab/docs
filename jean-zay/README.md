# First connection

You must create an account on edari, get associated to it etc etc... see somewhere else

## Setup login and SSH keys

You should edit your `.ssh/config` file to add the following lines to allow easy login on this machine (do not copy the definition for pascal if it is already there.

```bash
Host pascal
    User YOUR_CHOLESKY_USERNAME
    Hostname pascal.cpht.polytechnique.fr
    DynamicForward 9156

Host jeanzay
    Hostname jean-zay.idris.fr
    ProxyJump pascal
    User YOUR_IDRIS_USERNAME
```

You should have received an email with the USERNAME and the first half of the password (the second half of the password is the one you chose when you filled the forms to ask for access).
The first time you login, you will have to use this composed password (note, you can copy-paste in the password field).
Then you will be forced to change the password. Pick something good but that you won't forget!

### SSH keys

After the first login you must setup ssh keys. To do that simply run the following command

```bash
ssh-copy-id jeanzay
```

This will copy your ssh keys to jean zay. If for any reason the command `ssh-copy-id` is not available, install it with `brew install` or `apt-get install`.

From now on you can login directly with `ssh jeanzay`.

## Setup VS Code remote.

Unfortunately, standard VS Code on Jean Zay is blocked, however you can still use it through some hoops and crooks.

 - Ensure that in your `.ssh/config` file you have `pascal` setup with `DynamicForward 9156` 
 - Use **Google Chrome** (it does not work with Safari...), install [this proxy extension](https://chromewebstore.google.com/detail/proxy-switcher-and-manage/onnfghpihccifgojkpnnncpagjcdbjod)
 - Go to the settings of the extension and import the settings from `proxy-switcher-preferences.json` file that you can download from this repository

### Using it

The setting above allows you to use a proxy for your Google Chrome traffic, routing it through some server. To use this, you need to do two things:

 - Connect to pascal via ssh (`ssh pascal`)and leave the terminal open
 - Use Google Chrome, enable the `Manual Proxy` with the extension by clicking on the extension symbol and then on manual proxy.
 - Go to the website https://jupyterhub.idris.fr
 - Launch a vscode instance on the login node.

When you are done, use the extension to go back to `direct mode` and disconnect from pascal.



# Using the Jean Zay JupyterHub

There are two kind of servers that you might want to run on the Jean Zay JupyterHub: VS Code instances and JupyterLab instances. To create any kind of instance, first click on `Add New Server Instance` in the home webpage.

In general, you can refer to the [Jean Zay JupyterHub documentation](https://idris-cnrs.gitlab.io/jupyter/jupyter-documentation/).


## VS Code

To create a VS Code instance, click on `Add New Server Instance`. Then in the server options, select `Spawn server on login (frontal) node` and choose `VSCode` as the frontend. Make sure to ask for enough time so that the server does not shut down while you are working. Once you press the `Start` button, you will have a VS Code page in your browser that you can use just like you would locally.

A VS Code instance always starts in the `HOME` directory. However, its memory limit is very small so in general you will want to work in the `WORK` directory. You can find its path with `$WORK`. You can also check your memory usage using `idrquota --home` and `idrquota --work`.


## JupyterLab

To create a JupyterLab instance, click on `Add New Server Instance`. Then in the server options, select `Spawn server on SLURM node` and choose `JupyterLab` as the frontend. Select a CPU or a GPU in the `Account` field. Make sure to ask for enough time so that the server does not shut down while you are working. Finally, select the directory in which to work (which would usually be the work directory). Once you press the `Start` button, you will have a JupyterLab page in your browser that you can use just like you would locally. You can create notebooks and run them, but we still need to create an environment with all the libraries we want.

## Setting up an environment and a Jupyter kernel

First, as mentionned before, we usually want to use the work directory since it has a higher memory quota. However, packages are stored in the home directory by default, and it will quickly saturate its quota if we leave it like this. To circumvent this problem, as detailed [here](http://www.idris.fr/jean-zay/gpu/jean-zay-gpu-python-env.html), we are going to move the relevant directories to `$WORK` and symlink them to `$HOME`.
- If the folder `$HOME/.local` already exists, move it to `$WORK` with `mv $HOME/.local $WORK`. If does not exist, create it in work with `mkdir $WORK/.local`.
- Then create a symlink with `ln -s $WORK/.local $HOME`.
- Finally, repeat the two previous steps with the file `.conda` instead of `.local`.

Next, we need to load conda by running `module load python`. You can now create an environment as usual. Make sure your environment is created with python so that pip installs in the new environment.

Lastly, we need to create a kernel corresponding to this new environment. Run `pip install ipykernel` and then `python -m ipykernel install --user --name my_kernel_name --display-name my_kernel_display_name`. Then you will be able to find and select your new kernel in the list of kernels proposed in JupyterLab.