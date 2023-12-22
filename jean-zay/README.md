# First connection

You must create an account on edari, get associated to it etc etc... see somewhere else

## Setup login and ssh keys

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

### ssh keys

After the first login you must setup ssh keys. To do that simply run the following command

```bash
ssh-copy-id jeanzay
```

This will copy your ssh keys to jean zay. If for any reason the command `ssh-copy-id` is not available, install it with `brew install` or `apt-get install`.

From now on you can login directly with `ssh jeanzay`.

## Setup VSCODE remote.

Unfrotunately standard vscode on Jean Zay is blocked, however you can still use it through some hoops and crooks.

 - Ensure that in your `.ssh/config` file you have `pascal` setup with `DynamicForward 9156` 
 - Use **Google Chrome** (it does not work with Safari...), install [this proxy extension](https://chromewebstore.google.com/detail/proxy-switcher-and-manage/onnfghpihccifgojkpnnncpagjcdbjod)
 - Go to the settings of the extension and import the settings from `proxy-switcher-preferences.json` file that you can download from this repository

### Using it

The setting above allows you to use a proxy for your Google Chrome traffic, routing it through some server. To use this, you need to do two things:

 - Connect to pascal via ssh (`ssh pascal`)and leave the terminal open
 - Use Google Chrome, enable the `Manual Proxy` with the extension by clicking on the extension simbol and then on manual proxy.
 - Go to the website https://jupyterhub.idris.fr
 - Launch a vscode instance on the login node.

When you are done, use the extension to go back to `direct mode` and deconnect from pascal.


