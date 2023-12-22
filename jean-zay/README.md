# First connection

You must create an account on edari, get associated to it etc etc... see somewhere else

## Setup login and ssh keys

You should edit your `.ssh/config` file to add the following lines to allow easy login on this machine (do not copy the definition for pascal if it is already there.

```bash
Host pascal
    User filippo.vicentini
    Hostname pascal.cpht.polytechnique.fr

Host jeanzay
    Hostname jean-zay.idris.fr
    ProxyJump pascal
    User YOUR_USERNAME
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

It does not easily work...
