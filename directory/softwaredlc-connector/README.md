# SoftwareDLC connector

**Beta.** SoftwareDLC is in Beta: skills, tools and the graph schema can still
change between versions.

SoftwareDLC keeps a graph of your software: the products, features and user
stories it serves, the components and code that build them, and the evidence
that links the two. This plugin connects Claude to the hosted SoftwareDLC
service:

- **Read your SoftwareDLC projects.** The `softwaredlc-hosted` skill and
  connector list the organizations, projects and branches you can read, and
  search and read their graphs. You pick the branch; Claude never picks one
  for you.
- **Support issues.** The `support-issues` skill lists and reads Maintain
  support issues on projects where you are support staff, and logs new ones
  where you may also comment on the project. Logging a support issue is the
  connector's only write.
- **Ask about SoftwareDLC.** The `softwaredlc-reference` skill answers
  questions about SoftwareDLC and its graph vocabulary, with no sign-in.

It runs nothing on your computer. To build a graph from your code on your
own machine, or to work on a repository bound to a SoftwareDLC project,
install the full `softwaredlc` plugin in Claude Code instead:

```text
/plugin marketplace add SoftwareDLC/plugins
/plugin install softwaredlc@softwaredlc
```

## What the plugin runs, sends and stores

- **Runs on your computer.** Nothing: the plugin holds skills and one remote
  connector, and no program, script or local server.
- **Sends to SoftwareDLC.** The connector connects to
  `https://www.softwaredlc.com/api/mcp`. Until you sign in, the service answers
  only with a sign-in request. Once you sign in, the connector sends your
  sign-in token, the plugin's version, and the tool calls you make: searches,
  the organization, project, branch and documents you pick, and the text of a
  support issue you log. SoftwareDLC records your tool use as described in its
  Privacy Policy.
- **Stores on your computer.** Nothing beyond what Claude keeps for any
  connector you sign in to.

## Privacy, terms and support

- Privacy Policy: https://www.softwaredlc.com/privacy-policy
- Terms of Service: https://www.softwaredlc.com/terms
- Support: support@softwaredlc.com

## License

The plugin is licensed under the Functional Source License, Version 1.1, with
Apache 2.0 as the future license (FSL-1.1-ALv2); see `LICENSE`.
