# How to install a dependency in a bun monorepo.

1. Cd into the target directory
2. Add dependency:

   1. pack/app dependency: `bun add <pack-url> [<pack-url>]`

   2. dev dependency: `bun add -D <pack-url> [<pack-url>]`

   3. peer dependency: `bun add -P <pack-url> [<pack-url>]`

# How to install an internal package in an app

In order to add an internal package as dependency of an application simply add `"<package-name>":"workspace:*"`
