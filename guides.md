### Code style

- Code should be simple and explicit.
- Prefer small modules that do one thing well and avoid large frameworks.
- If a module exports a single function use `module.exports = ...` not `module.exports.thing = ...`.
- Line length should be limited to 80 characters.
- When writing a module use this order for your code:
  - External dependencies (e.g. `require('http')`)
  - Internal dependencies (e.g. `require('./api')`)
  - Any declarations or actions absolutely needed before `module.exports`
  - `module.exports`
  - Everything else should be ordered "high-level" to "low-level" and "first-use" to "last-use" -- low-level helper functions should be at the bottom.
- Use descriptive variable names.
- Prefer `.forEach()` over for loops.
- Functions should be short enough to fit on a single page (max 30-40 lines).
- Functions should generally not accept more than 3-4 arguments, consider using an "options" object instead.

```js
function foo(a, b, c, d) {
  call(a, b, c, d);
} // wrong
function foo(opts) {
  call(opts.a, opts.b, opts.c, opts.d);
} // right
```

- Use single line conditionals when possible.

  ```js
  // wrong
  if (thing) {
    something();
  }
  // right
  if (thing) something();
  ```

- [Use early returns when possible.](http://blog.timoxley.com/post/47041269194/avoid-else-return-early)

```js
function doSomething(input) {
  if (!input) return false; // like this
  // Rest of the code
}
```

### Gitkillall code

- Never commit passwords or access tokens into version control. If you do, you must tell your manager or team lead immediately.
- [Each PR should be as small and simple as possible](git.md) to prevent bugs and make code review as quick as possible. Do not include unrelated changes. Open a separate issue/PR for those.
- Do not modify a project's `.gitignore` to add files related to your environment or editor. Use your own profile's `~/.gitignore` for that.
- Use present tense in commits "upgrade dependencies" or "introduce custom error object"
- Use [Conventional Commits][conventional-commits-url]:

```
feat: add hat wobble (#227)
^--^  ^------------^ ^----^
|     |              |
|     |              +-> Issue number
|     |
|     +-> Summary in present tense.
|
+-------> Type
```

#### Allowed types

- **feat**: A new feature
- **fix**: A bug fix
- **docs**: Documentation only changes
- **style**: Changes that do not affect the meaning of the code (white-space, formatting, missing semi-colons, etc)
- **refactor**: A code change that neither fixes a bug nor adds a feature
- **perf**: A code change that improves performance
- **test**: Adding missing tests
- **chore**: Changes to the build process or auxiliary tools and libraries such as documentation generation

### Github Workflow

1. Create a new branch to work on the issue
2. After you begin work on your new branch, create a new pull request. Be sure that your PR describes your change, includes screenshots or animated gifs showing the change, and references the issue so that Github will automatically close it:

- Title:
  - Change Advertiser Form to Autofocus Advertiser Name Field On Load
- Description:
  - Text description of change
  - [ Insert Screenshot / Animated Gif] (if this is a UI change and visible)
  - Closes #197

### App Structure

- API urls should be kebab-case e.g. : `/api/route-name` (NOT `/api/routeName`)

### Suggesting Enhancements

Should you think that we could make a project work better, please feel free to suggest a way. We love feedback and we wish to keep things simple and improve them over time. We are building this bottom up and trying to evolve it and make more performant over time.

[eslint-url]: https://eslint.org/
[conventional-commits-url]: https://conventionalcommits.org/

# Git

## Pull Requests

PRs and code changes should be the smallest useful unit. This is because later the PR will be the best source of information for you and other developers. The more code that is in a particular PR, the more difficult it is to quickly understand what the code does, how it should be used, and why it was added.

The "size" of a PR can be measured in the number of lines of code added and removed, the number of files with changes, but also the number of different "types" of changes.

For example, a typical PR might have two types of changes: an added feature and an added test. Often, it is tempting to to "throw in" additional types of changes like refactoring or code style changes. However, this adds substantial noise to the PR. This additional noise makes it more difficult to understand the code at review time, when a change is needed, and if it needs debugging.

PRs consisting of only refactor or only code style changes are very quick to review because there is a low chance of introducing bugs.
