<!-- Generated from the SoftwareDLC public reference corpus. Do not edit. -->
# Public graph schema vocabulary

Reference ID: `public-graph-schema` · Version: 2026-10-09 · Topics: graph_schema, mental_model

The public top-level graph entity kinds, node types, and semantic relationship types used by SoftwareDLC.

## Entity model

Section ID: `entity-model` (definitions)

Nodes are stable system or lifecycle concepts with typed domain data and optional parent identity.
Edges are independently meaningful directed semantic relationships.
Paths are named ordered or anchored journeys; path relations connect paths when that relationship matters.
Tags classify graph content without inventing semantic edges.

## Modeling guidance

Section ID: `modeling-guidance` (principles)

Use parent hierarchy for ownership and membership; do not duplicate containment with visible edges.
Each node type section lists the parent types it may sit under and the fields its domain data requires. A relationship such as implements never makes its target a child: a node sits under one of its allowed parent types, or at the top level where its section allows that.
A required field such as table.definition is required inside the node type's own data block (data.table) when the node carries that block; some types may leave the block out and others must carry it, and their section says which. Each section with required fields ends with a minimal valid data block showing what those fields look like.
Choose the narrowest relationship that preserves the intended meaning.
Each relationship type section lists the source and target node types it allows; an edge between any other pair is refused.
Treat the canonical graph examples as conceptual guidance, not writable payload schemas; the minimal data blocks in node type sections are valid data.

## Canonical examples

Section ID: `examples` (examples)

The structured schema_summary includes product/story, UI/API/data, and asynchronous messaging examples.
Each example uses stable node identities, explicit hierarchy, canonical relationship tokens, and a short semantic explanation.

## Publication boundary

Section ID: `publication-boundary` (boundaries)

This reference publishes curated vocabulary and semantics, not protected writable developer schemas.
Exact mutation payloads, permissions, and limits come from the authorized operation surface.

## Entity kinds

Section ID: `schema.entity-kinds` (entity_kinds)

node, edge, path, path_relation, tag

## All node types

Section ID: `schema.node-types` (node_type)

actor: A distinct user, role, or external system that interacts with the product; for an external system, actor.actor_kind is external_system.
product: A durable product boundary that organizes user-recognizable features. Its kind is shipped (the default) for what the organization delivers, or internal for how it operates, such as its development workflow.
feature: A user-recognizable product capability that owns concrete stories.
system: A product or module boundary that owns goals and their structural implementation; system.external is true for an outside system the product integrates with.
goal: A desired outcome that one or more actors care about within a system.
story: A user story that decomposes product intent into a concrete flow of steps.
start: The single entry point of a story flow.
process: An operational step or activity within a story flow. It may say who performs it: an actor or a slot, and whether the step is automated, done by an agent, or done by a person.
decision: A conditional branch point whose paths must rejoin or terminate. It may say who decides it: an actor or a slot, and whether the decision is automated, made by an agent, or made by a person.
end: A terminal outcome for a story path.
context: A top-level architecture boundary that organizes major structural subsystems.
container: A deployable C4 unit such as an application, service, UI, or datastore.
workload: A runtime execution unit such as a process, function, or orchestrated container.
database: A logical datastore boundary that groups related tables or collections; database.type is its engine: postgresql, mysql, mongodb, neo4j, influxdb, dynamodb, elasticsearch, or other.
object_store: A logical storage boundary for files, media, backups, or blob objects.
message_broker: A logical asynchronous messaging boundary that owns topics and queues.
cache: A logical cache boundary for transient, derived, or edge-cached data.
website: A public or internal web user-interface surface.
app: An installed mobile or desktop client that is not served as a website, with its platform, framework, and distribution.
library: A reusable code package other code depends on and that is not deployed on its own, first-party or from a registry in any ecosystem, with its optional package name, ecosystem, version, and license. A library, component or function that calls a container whose operations are not modeled uses that container; once they are, it uses each operation instead.
api_gateway: An API ingress boundary in front of downstream services or containers.
table: A relational table inside a logical database boundary.
collection: A NoSQL document or key-value collection inside a database boundary.
bucket: An addressable object-store container that holds files or blob objects.
topic: A publish/subscribe topic, stream, or event channel.
queue: A point-to-point queue or dead-letter queue for asynchronous work.
component: An internal code or module boundary inside a container, website, app, page, library, or another component.
page: An individual screen or view within a website or an app.
ui_component_definition: A reusable visual component, layout, or page-template definition without executable behavior.
ui_frame: A designed screen, state, or flow-step artifact shown to users.
function: A callable unit of behavior with typed input, output, and error signatures. function.signatures is required but may be an empty list ([]) when the signatures are not known; a function uses the http_operation, rpc_operation or async_operation it calls.
http_operation: An HTTP operation contract identified by method, path, and operation semantics; the method any is a catch-all route that takes every method, such as API Gateway ANY.
async_operation: An asynchronous operation contract identified by action and messaging semantics.
rpc_operation: A non-REST operation contract (gRPC method, GraphQL root field, tRPC procedure, JSON-RPC method, SOAP operation, or Thrift method) identified by protocol, service, and name.
job: Background work started by a schedule, an operator, or a workflow, with its trigger, engine, retry, timeout, and concurrency rules.
schema: A reusable structured data contract referenced by functions, operations, or other schemas.
code: A concrete source artifact such as a file, module, or snippet linked to a modeled concept.
team: A group of members that owns work, at the root or under its parent team, with a key unique among teams.
job_function: A kind of work a member of the organization does, such as Engineering Manager or Reviewer, at the root or under its parent job_function, with a key.
post: One job_function staffed in one team: it sits under the team and instantiates exactly one job_function.
access_role: A named set of actions, such as graph.edit, that grants from a job_function or an access_policy confer.
access_policy: An attribute rule that allows or denies one access role to the members and resources it matches, with a reason.
slot: A named part a workflow step needs someone to play, such as reviewer or approver, which job functions fill.
environment: A place the work runs, such as local, staging, or production, with its kind and promotion order.

## Node type: actor

Section ID: `schema.node-types.actor` (node_type)

A distinct user, role, or external system that interacts with the product; for an external system, actor.actor_kind is external_system.

Allowed parent types: none; it sits at the top level
Required fields under data: none
Optional fields under data: actor.actor_kind; actor.role; actor.external; actor.responsibilities; actor.pain_points
Optional values: actor.actor_kind (one of: person, team, organization, external_system, service)

## Node type: product

Section ID: `schema.node-types.product` (node_type)

A durable product boundary that organizes user-recognizable features. Its kind is shipped (the default) for what the organization delivers, or internal for how it operates, such as its development workflow.

Allowed parent types: none; it sits at the top level
Required fields under data: none
Optional fields under data: product.kind
Optional values: product.kind (one of: shipped, internal)

## Node type: feature

Section ID: `schema.node-types.feature` (node_type)

A user-recognizable product capability that owns concrete stories.

Allowed parent types: product (or none, at the top level)
Required fields under data: none

## Node type: system

Section ID: `schema.node-types.system` (node_type)

A product or module boundary that owns goals and their structural implementation; system.external is true for an outside system the product integrates with.

Allowed parent types: none; it sits at the top level
Required fields under data: none
Optional fields under data: system.purpose; system.boundary; system.owner; system.external; system.responsibilities

## Node type: goal

Section ID: `schema.node-types.goal` (node_type)

A desired outcome that one or more actors care about within a system.

Allowed parent types: system (or none, at the top level)
Required fields under data: none
Optional fields under data: goal.outcome; goal.success_metrics; goal.priority
Optional values: goal.priority (one of: low, medium, high, critical)

## Node type: story

Section ID: `schema.node-types.story` (node_type)

A user story that decomposes product intent into a concrete flow of steps.

Allowed parent types: feature (or none, at the top level)
Required fields under data: none
Optional fields under data: story.narrative; story.actor_ref; story.goal_ref; story.priority; story.journey_entry
Optional values: story.priority (one of: low, medium, high, critical)

## Node type: start

Section ID: `schema.node-types.start` (node_type)

The single entry point of a story flow.

Allowed parent types: story (or none, at the top level)
Required fields under data: none
Optional fields under data: start.trigger; start.preconditions

## Node type: process

Section ID: `schema.node-types.process` (node_type)

An operational step or activity within a story flow. It may say who performs it: an actor or a slot, and whether the step is automated, done by an agent, or done by a person.

Allowed parent types: story (or none, at the top level)
Required fields under data: none
Optional fields under data: process.action; process.owner; process.expected_result; process.performed_by

## Node type: decision

Section ID: `schema.node-types.decision` (node_type)

A conditional branch point whose paths must rejoin or terminate. It may say who decides it: an actor or a slot, and whether the decision is automated, made by an agent, or made by a person.

Allowed parent types: story (or none, at the top level)
Required fields under data: none
Optional fields under data: decision.question; decision.conditions; decision.default_branch; decision.decided_by

## Node type: end

Section ID: `schema.node-types.end` (node_type)

A terminal outcome for a story path.

Allowed parent types: story (or none, at the top level)
Required fields under data: none
Optional fields under data: end.outcome; end.postconditions; end.success

## Node type: context

Section ID: `schema.node-types.context` (node_type)

A top-level architecture boundary that organizes major structural subsystems.

Allowed parent types: none; it sits at the top level
Required fields under data: none
Optional fields under data: context.purpose; context.boundary; context.environment; context.responsibilities
Optional values: context.environment (one of: product, platform, external, development, test, production)

## Node type: container

Section ID: `schema.node-types.container` (node_type)

A deployable C4 unit such as an application, service, UI, or datastore.

Allowed parent types: context (or none, at the top level)
Required fields under data: none
Optional fields under data: container.technology; container.runtime; container.deployment_unit; container.responsibilities

## Node type: workload

Section ID: `schema.node-types.workload` (node_type)

A runtime execution unit such as a process, function, or orchestrated container.

Allowed parent types: context (or none, at the top level)
Required fields under data: none

## Node type: database

Section ID: `schema.node-types.database` (node_type)

A logical datastore boundary that groups related tables or collections; database.type is its engine: postgresql, mysql, mongodb, neo4j, influxdb, dynamodb, elasticsearch, or other.

Allowed parent types: context (or none, at the top level)
Required fields under data: database.type (one of: postgresql, mysql, mongodb, neo4j, influxdb, dynamodb, elasticsearch, other)
The data.database block is optional; a node that carries it gives every field above.
Minimal valid data: {"label":"Orders database","database":{"type":"postgresql"}}

## Node type: object_store

Section ID: `schema.node-types.object_store` (node_type)

A logical storage boundary for files, media, backups, or blob objects.

Allowed parent types: context (or none, at the top level)
Required fields under data: none
Optional fields under data: object_store.provider
Optional values: object_store.provider (one of: aws_s3, gcs, azure_blob, supabase_storage, other)

## Node type: message_broker

Section ID: `schema.node-types.message_broker` (node_type)

A logical asynchronous messaging boundary that owns topics and queues.

Allowed parent types: context (or none, at the top level)
Required fields under data: none
Optional fields under data: message_broker.provider
Optional values: message_broker.provider (one of: kafka, rabbitmq, sns_sqs, pubsub, nats, other)

## Node type: cache

Section ID: `schema.node-types.cache` (node_type)

A logical cache boundary for transient, derived, or edge-cached data.

Allowed parent types: context (or none, at the top level)
Required fields under data: none
Optional fields under data: cache.provider; cache.ttl_seconds
Optional values: cache.provider (one of: redis, memcached, cloudflare_cache, browser, other)

## Node type: website

Section ID: `schema.node-types.website` (node_type)

A public or internal web user-interface surface.

Allowed parent types: context (or none, at the top level)
Required fields under data: none
Optional fields under data: website.domain; website.path; website.framework; website.route_prefix; website.theme

## Node type: app

Section ID: `schema.node-types.app` (node_type)

An installed mobile or desktop client that is not served as a website, with its platform, framework, and distribution.

Allowed parent types: context (or none, at the top level)
Required fields under data: app.platform (one of: ios, android, cross_platform_mobile, desktop)
Every app node needs its data.app block.
Optional fields under data: app.framework; app.distribution; app.theme
Optional values: app.distribution (one of: app_store, play_store, installer, package_manager, internal, other)
Minimal valid data: {"label":"Orders mobile app","app":{"platform":"ios"}}

## Node type: library

Section ID: `schema.node-types.library` (node_type)

A reusable code package other code depends on and that is not deployed on its own, first-party or from a registry in any ecosystem, with its optional package name, ecosystem, version, and license. A library, component or function that calls a container whose operations are not modeled uses that container; once they are, it uses each operation instead.

Allowed parent types: context (or none, at the top level)
Required fields under data: none
Optional fields under data: library.package_name; library.ecosystem; library.version; library.license

## Node type: api_gateway

Section ID: `schema.node-types.api_gateway` (node_type)

An API ingress boundary in front of downstream services or containers.

Allowed parent types: context (or none, at the top level)
Required fields under data: none
Optional fields under data: api_gateway.name; api_gateway.openapi; api_gateway.openapi_hash; api_gateway.endpoints

## Node type: table

Section ID: `schema.node-types.table` (node_type)

A relational table inside a logical database boundary.

Allowed parent types: database (or none, at the top level)
Required fields under data: table.definition
The data.table block is optional; a node that carries it gives every field above.
Optional fields under data: table.rls_enabled; table.rls_policies
Minimal valid data: {"label":"orders","table":{"definition":{"type":"create","keyword":"table","table":[{"db":"","table":"orders"}],"create_definitions":[{"id":"orders_id","column":{"type":"column_ref","table":null,"column":"id"},"definition":{"dataType":"uuid"},"resource":"column"}]}}}

## Node type: collection

Section ID: `schema.node-types.collection` (node_type)

A NoSQL document or key-value collection inside a database boundary.

Allowed parent types: database (or none, at the top level)
Required fields under data: none
Optional fields under data: collection.name; collection.document_schema_ref

## Node type: bucket

Section ID: `schema.node-types.bucket` (node_type)

An addressable object-store container that holds files or blob objects.

Allowed parent types: object_store (or none, at the top level)
Required fields under data: none
Optional fields under data: bucket.name; bucket.versioned

## Node type: topic

Section ID: `schema.node-types.topic` (node_type)

A publish/subscribe topic, stream, or event channel.

Allowed parent types: message_broker (or none, at the top level)
Required fields under data: none
Optional fields under data: topic.name; topic.ordering

## Node type: queue

Section ID: `schema.node-types.queue` (node_type)

A point-to-point queue or dead-letter queue for asynchronous work.

Allowed parent types: message_broker (or none, at the top level)
Required fields under data: none
Optional fields under data: queue.name; queue.fifo; queue.dead_letter

## Node type: component

Section ID: `schema.node-types.component` (node_type)

An internal code or module boundary inside a container, website, app, page, library, or another component.

Allowed parent types: container, page, library, website, app, component (or none, at the top level)
Required fields under data: none
Optional fields under data: component.technology; component.module_path; component.responsibilities

## Node type: page

Section ID: `schema.node-types.page` (node_type)

An individual screen or view within a website or an app.

Allowed parent types: website, app (or none, at the top level)
Required fields under data: none
Optional fields under data: page.route_path; page.route_pattern; page.title; page.auth_required; page.states; page.anchors

## Node type: ui_component_definition

Section ID: `schema.node-types.ui_component_definition` (node_type)

A reusable visual component, layout, or page-template definition without executable behavior.

Allowed parent types: container, website, app, library (or none, at the top level)
Required fields under data: ui_component_definition.name; ui_component_definition.role (one of: component, layout, page_template); ui_component_definition.dialect_id (one of: react-mui-web, html-web, terminal-text, swiftui, jetpack-compose, flutter, react-native); ui_component_definition.props_schema; ui_component_definition.slot_definitions; ui_component_definition.variant_sets; ui_component_definition.root_instance_tree
Every ui_component_definition node needs its data.ui_component_definition block.
Optional fields under data: ui_component_definition.local_state_definitions; ui_component_definition.source_asset; ui_component_definition.fork_of; ui_component_definition.component_upgrade_policy; ui_component_definition.authored_tree_changes; ui_component_definition.prop_definitions; ui_component_definition.recipe_definitions; ui_component_definition.exposed_prop_definitions; ui_component_definition.interaction_bindings; ui_component_definition.data_bindings; ui_component_definition.dependency_approvals; ui_component_definition.summary; ui_component_definition.documentation
Optional values: ui_component_definition.component_upgrade_policy (one of: manual, auto)
Minimal valid data: {"label":"Order card","ui_component_definition":{"name":"Order card","role":"component","dialect_id":"react-mui-web","props_schema":[],"slot_definitions":[],"variant_sets":[],"root_instance_tree":{"id":"root","source_primitive_id":"core.stack","props":{},"variant_selection":{},"children":[{"id":"text_1","source_primitive_id":"core.text","props":{"content":"Order 1042"},"variant_selection":{},"children":[],"slot_assignments":[]},{"id":"text_2","source_primitive_id":"core.text","props":{"content":"Shipped"},"variant_selection":{},"children":[],"slot_assignments":[]},{"id":"text_3","source_primitive_id":"core.text","props":{"content":"$42.00"},"variant_selection":{},"children":[],"slot_assignments":[]}],"slot_assignments":[]}}}

## Node type: ui_frame

Section ID: `schema.node-types.ui_frame` (node_type)

A designed screen, state, or flow-step artifact shown to users.

Allowed parent types: page, website, app (or none, at the top level)
Required fields under data: ui_frame.name; ui_frame.role (one of: screen, page_state, component_state, flow_step); ui_frame.dialect_id (one of: react-mui-web, html-web, terminal-text, swiftui, jetpack-compose, flutter, react-native); ui_frame.root_instance_tree
Every ui_frame node needs its data.ui_frame block.
Optional fields under data: ui_frame.local_state_definitions; ui_frame.default_render_size; ui_frame.source_asset; ui_frame.fork_of; ui_frame.component_upgrade_policy; ui_frame.authored_tree_changes; ui_frame.variant_selection; ui_frame.interaction_bindings; ui_frame.data_bindings; ui_frame.dependency_approvals; ui_frame.summary; ui_frame.documentation
Optional values: ui_frame.component_upgrade_policy (one of: manual, auto)
Minimal valid data: {"label":"Orders list","ui_frame":{"name":"Orders list","role":"screen","dialect_id":"react-mui-web","root_instance_tree":{"id":"root","source_primitive_id":"core.stack","props":{},"variant_selection":{},"children":[{"id":"text_1","source_primitive_id":"core.text","props":{"content":"Orders"},"variant_selection":{},"children":[],"slot_assignments":[]},{"id":"text_2","source_primitive_id":"core.text","props":{"content":"Order 1042: shipped"},"variant_selection":{},"children":[],"slot_assignments":[]},{"id":"text_3","source_primitive_id":"core.text","props":{"content":"Order 1043: packing"},"variant_selection":{},"children":[],"slot_assignments":[]},{"id":"text_4","source_primitive_id":"core.text","props":{"content":"Order 1044: paid"},"variant_selection":{},"children":[],"slot_assignments":[]},{"id":"text_5","source_primitive_id":"core.text","props":{"content":"Showing 3 of 3 orders"},"variant_selection":{},"children":[],"slot_assignments":[]}],"slot_assignments":[]}}}

## Node type: function

Section ID: `schema.node-types.function` (node_type)

A callable unit of behavior with typed input, output, and error signatures. function.signatures is required but may be an empty list ([]) when the signatures are not known; a function uses the http_operation, rpc_operation or async_operation it calls.

Allowed parent types: container, workload, website, app, library, database, api_gateway, page, component, ui_component_definition, ui_frame, http_operation, async_operation, rpc_operation, job (or none, at the top level)
Required fields under data: function.name; function.signatures
The data.function block is optional; a node that carries it gives every field above.
Optional fields under data: function.summary; function.async; function.start_code_node_id
Minimal valid data: {"label":"createOrder","function":{"name":"createOrder","signatures":[{"id":"default","input_schema":{"type":"object","properties":{"customer_id":{"type":"string"}},"required":["customer_id"]},"output_schema":{"type":"object"}}]}}

## Node type: http_operation

Section ID: `schema.node-types.http_operation` (node_type)

An HTTP operation contract identified by method, path, and operation semantics; the method any is a catch-all route that takes every method, such as API Gateway ANY.

Allowed parent types: api_gateway, website, app, container, workload, page, ui_component_definition, ui_frame, component (or none, at the top level)
Required fields under data: http_operation.name
The data.http_operation block is optional; a node that carries it gives every field above.
Optional fields under data: http_operation.operation_id; http_operation.openapi_operation; http_operation.openapi_doc_ref; http_operation.method; http_operation.path; http_operation.summary; http_operation.description; http_operation.examples
Optional values: http_operation.method (one of: get, post, put, patch, delete, options, head, any)
Minimal valid data: {"label":"POST /orders","http_operation":{"name":"Create order","method":"post"}}

## Node type: async_operation

Section ID: `schema.node-types.async_operation` (node_type)

An asynchronous operation contract identified by action and messaging semantics.

Allowed parent types: workload, container, api_gateway, website, app, page, ui_component_definition, ui_frame, component (or none, at the top level)
Required fields under data: async_operation.name
The data.async_operation block is optional; a node that carries it gives every field above.
Optional fields under data: async_operation.operation_id; async_operation.asyncapi_operation; async_operation.asyncapi_doc_ref; async_operation.action; async_operation.summary; async_operation.description; async_operation.examples
Optional values: async_operation.action (one of: send, receive)
Minimal valid data: {"label":"Consume order update","async_operation":{"name":"Consume order update","action":"receive"}}

## Node type: rpc_operation

Section ID: `schema.node-types.rpc_operation` (node_type)

A non-REST operation contract (gRPC method, GraphQL root field, tRPC procedure, JSON-RPC method, SOAP operation, or Thrift method) identified by protocol, service, and name.

Allowed parent types: api_gateway, website, app, container, workload, page, ui_component_definition, ui_frame, component (or none, at the top level)
Required fields under data: rpc_operation.name; rpc_operation.protocol (one of: grpc, graphql, trpc, jsonrpc, soap, thrift)
The data.rpc_operation block is optional; a node that carries it gives every field above.
Optional fields under data: rpc_operation.service; rpc_operation.kind; rpc_operation.contract_ref; rpc_operation.summary; rpc_operation.description; rpc_operation.examples
Optional values: rpc_operation.kind (one of: unary, server_stream, client_stream, bidi_stream, query, mutation, subscription, request)
Minimal valid data: {"label":"GetOrder","rpc_operation":{"name":"GetOrder","protocol":"grpc"}}

## Node type: job

Section ID: `schema.node-types.job` (node_type)

Background work started by a schedule, an operator, or a workflow, with its trigger, engine, retry, timeout, and concurrency rules.

Allowed parent types: container, workload, job (a parent is required)
Required fields under data: job.trigger.kind: schedule (with cron), manual, workflow, step
Every job node needs its data.job block.
Optional fields under data: job.engine; job.retry; job.timeout_seconds; job.concurrency; job.idempotent; job.summary; job.description
Optional values: job.engine (one of: cron, celery, sidekiq, hangfire, quartz, spring, kubernetes_cronjob, vercel_cron, pg_cron, temporal, airflow, step_functions, dagster, github_actions, other); job.concurrency (one of: allow, forbid, replace)
Minimal valid data: {"label":"Nightly order export","job":{"trigger":{"kind":"schedule","cron":"0 3 * * *","timezone":"UTC"}}}

## Node type: schema

Section ID: `schema.node-types.schema` (node_type)

A reusable structured data contract referenced by functions, operations, or other schemas.

Allowed parent types: schema, database, container, api_gateway, http_operation, rpc_operation, function, library (or none, at the top level)
Required fields under data: schema.name; schema.schema
The data.schema block is optional; a node that carries it gives every field above.
Optional fields under data: schema.summary; schema.description
Minimal valid data: {"label":"Order","schema":{"name":"Order","schema":{"type":"object","properties":{"id":{"type":"string"}},"required":["id"]}}}

## Node type: code

Section ID: `schema.node-types.code` (node_type)

A concrete source artifact such as a file, module, or snippet linked to a modeled concept.

Allowed parent types: function, container, database, table, schema, component, page, http_operation, async_operation, rpc_operation, job, ui_component_definition, ui_frame, library (or none, at the top level)
Required fields under data: none
Optional fields under data: code.path; code.symbol; code.language; code.artifact_kind; code.start_line; code.end_line
Optional values: code.artifact_kind (one of: file, module, function, class, test, config, migration, script, snippet)

## Node type: team

Section ID: `schema.node-types.team` (node_type)

A group of members that owns work, at the root or under its parent team, with a key unique among teams.

Allowed parent types: team (or none, at the top level)
Required fields under data: label; team.key
Every team node needs its label and its data.team block.
Minimal valid data: {"label":"Platform","team":{"key":"platform"}}

## Node type: job_function

Section ID: `schema.node-types.job_function` (node_type)

A kind of work a member of the organization does, such as Engineering Manager or Reviewer, at the root or under its parent job_function, with a key.

Allowed parent types: job_function (or none, at the top level)
Required fields under data: label; job_function.key
Every job_function node needs its label and its data.job_function block.
Optional fields under data: job_function.requires_person; job_function.escalable
Minimal valid data: {"label":"Engineer","job_function":{"key":"engineer"}}

## Node type: post

Section ID: `schema.node-types.post` (node_type)

One job_function staffed in one team: it sits under the team and instantiates exactly one job_function.

Allowed parent types: team (a parent is required)
Required fields under data: label
Every post node needs its label.
Minimal valid data: {"label":"Platform engineer"}

## Node type: access_role

Section ID: `schema.node-types.access_role` (node_type)

A named set of actions, such as graph.edit, that grants from a job_function or an access_policy confer.

Allowed parent types: none; it sits at the top level
Required fields under data: label; access_role.key; access_role.actions
Every access_role node needs its label and its data.access_role block.
Minimal valid data: {"label":"Graph editor","access_role":{"key":"graph_editor","actions":["graph.edit"]}}

## Node type: access_policy

Section ID: `schema.node-types.access_policy` (node_type)

An attribute rule that allows or denies one access role to the members and resources it matches, with a reason.

Allowed parent types: none; it sits at the top level
Required fields under data: label; access_policy.effect (one of: allow, deny); access_policy.subject_match; access_policy.resource_match; access_policy.reason
Every access_policy node needs its label and its data.access_policy block.
Minimal valid data: {"label":"Engineers edit the graph","access_policy":{"effect":"allow","subject_match":{"job_function_keys":["engineer"]},"resource_match":{},"reason":"Engineers maintain the graph."}}

## Node type: slot

Section ID: `schema.node-types.slot` (node_type)

A named part a workflow step needs someone to play, such as reviewer or approver, which job functions fill.

Allowed parent types: none; it sits at the top level
Required fields under data: label; slot.key
Every slot node needs its label and its data.slot block.
Minimal valid data: {"label":"Primary on-call","slot":{"key":"primary_on_call"}}

## Node type: environment

Section ID: `schema.node-types.environment` (node_type)

A place the work runs, such as local, staging, or production, with its kind and promotion order.

Allowed parent types: none; it sits at the top level
Required fields under data: label; environment.key; environment.kind (one of: local, development, preview, test, staging, production, other)
Every environment node needs its label and its data.environment block.
Optional fields under data: environment.ref; environment.order
Minimal valid data: {"label":"Staging","environment":{"key":"staging","kind":"staging"}}

## All relationship types

Section ID: `schema.relationship-types` (relationship_type)

interacts: The source directly interacts with the target as part of user or external-system behavior.
pursues: An actor seeks or is responsible for achieving a goal.
collaborates: Actors work together while retaining distinct identities and responsibilities.
depends_on: The source requires the target to fulfill its responsibility or remain valid.
uses: The source consumes the target capability without claiming ownership or equivalence.
integrates_with: Peer boundaries coordinate through an intentional external or subsystem integration.
precedes: The source occurs before the target in an ordered flow.
branches_to: A decision source conditionally continues to the target branch.
calls: The source initiates a callable function or operation.
renders: The source produces or composes the target visual surface.
reads_from: The source retrieves state or content from the target data resource.
writes_to: The source persists or transmits state to the target data resource.
executes: The source runs or dispatches the target behavior or runtime unit.
implements: The pair connects intent or structure with a concrete realization; valid direction depends on the curated node-type pairing.
publishes: The source emits messages or events to the target topic or queue.
foreign_keys_to: A relational table contains a foreign-key reference to the target table.
schema_ref: The source uses the target schema as a structured data contract.
imports: The source has a build-time dependency on the target reusable artifact.
journey_continuation: After the source story's outcome (an end node), the actor continues with a different story (its start node); journeys are named by a story's journey_entry label.
available_on: The source story must be doable on the target surface (a website, app, plugin or CLI component, API gateway, or a page or operation for part of one); order says the order surfaces are built in, and deferred marks a surface required later. It says required, not built: implements says built.
instantiates: A post staffs the target job_function in its team; a post has exactly one.
fills: Holders of the source job_function perform the target workflow slot.
grants: The source job_function or access_policy confers the target access_role. A grant from a job_function names its scope (team, team_subtree, org, or none); an access_policy has exactly one grant, with no scope.

## Relationship type: interacts

Section ID: `schema.relationship-types.interacts` (relationship_type)

The source directly interacts with the target as part of user or external-system behavior.

Allowed node pairs (source -> targets):
- actor -> system, story, start, container, website, app, api_gateway, page

## Relationship type: pursues

Section ID: `schema.relationship-types.pursues` (relationship_type)

An actor seeks or is responsible for achieving a goal.

Allowed node pairs (source -> targets):
- actor -> goal

## Relationship type: collaborates

Section ID: `schema.relationship-types.collaborates` (relationship_type)

Actors work together while retaining distinct identities and responsibilities.

Allowed node pairs (source -> targets):
- actor -> actor

## Relationship type: depends_on

Section ID: `schema.relationship-types.depends_on` (relationship_type)

The source requires the target to fulfill its responsibility or remain valid.

Allowed node pairs (source -> targets):
- system -> system
- goal -> system, goal, story, start
- story -> system, story
- context -> context, container, workload, database, object_store, message_broker, cache, website, app, library, api_gateway
- container -> container, workload, database, object_store, message_broker, cache, website, app, library, api_gateway
- workload -> container, workload, database, object_store, message_broker, cache, library, api_gateway
- database -> database
- object_store -> object_store
- message_broker -> message_broker
- cache -> cache
- website -> container, workload, website, library, api_gateway
- app -> system, workload, website, app, library, api_gateway
- library -> library
- api_gateway -> container, workload, database, object_store, message_broker, cache, library, api_gateway
- table -> table, function
- collection -> collection, function
- bucket -> bucket, function
- topic -> topic, function
- queue -> queue, function
- component -> library, api_gateway, component, ui_component_definition
- page -> api_gateway, page
- ui_component_definition -> ui_component_definition, component
- ui_frame -> database, api_gateway, ui_frame
- function -> system, database, object_store, message_broker, cache, library, function
- http_operation -> workload, database, object_store, cache, api_gateway, http_operation
- async_operation -> workload, database, object_store, message_broker, cache, async_operation
- rpc_operation -> workload, database, object_store, cache, api_gateway, http_operation, rpc_operation
- job -> job
- schema -> table
- code -> database, object_store, message_broker, cache, code

## Relationship type: uses

Section ID: `schema.relationship-types.uses` (relationship_type)

The source consumes the target capability without claiming ownership or equivalence.

Allowed node pairs (source -> targets):
- container -> message_broker, api_gateway
- workload -> container, message_broker, api_gateway
- website -> container, api_gateway
- app -> api_gateway
- api_gateway -> container, message_broker
- component -> api_gateway, bucket, topic, queue, component, function, http_operation, async_operation, rpc_operation, container, ui_component_definition
- page -> api_gateway, component, function, http_operation, async_operation, rpc_operation
- ui_component_definition -> ui_component_definition, function, http_operation, async_operation, rpc_operation, component
- ui_frame -> api_gateway, ui_component_definition, function, http_operation, async_operation, rpc_operation
- function -> system, message_broker, topic, queue, component, function, http_operation, async_operation, rpc_operation, container
- http_operation -> api_gateway, function
- async_operation -> workload, message_broker, topic, queue, function
- rpc_operation -> api_gateway, function
- code -> message_broker, topic, queue, code
- library -> container

## Relationship type: integrates_with

Section ID: `schema.relationship-types.integrates_with` (relationship_type)

Peer boundaries coordinate through an intentional external or subsystem integration.

Allowed node pairs (source -> targets):
- system -> system
- context -> context
- container -> container
- object_store -> object_store
- message_broker -> message_broker
- cache -> cache
- website -> website
- app -> website, app
- api_gateway -> api_gateway
- topic -> queue
- http_operation -> http_operation
- async_operation -> async_operation
- rpc_operation -> rpc_operation

## Relationship type: precedes

Section ID: `schema.relationship-types.precedes` (relationship_type)

The source occurs before the target in an ordered flow.

Allowed node pairs (source -> targets):
- start -> process, decision, end
- process -> process, decision, end
- page -> page
- ui_frame -> page, ui_frame
- job -> job

## Relationship type: branches_to

Section ID: `schema.relationship-types.branches_to` (relationship_type)

A decision source conditionally continues to the target branch.

Allowed node pairs (source -> targets):
- decision -> process, end
- job -> job

## Relationship type: calls

Section ID: `schema.relationship-types.calls` (relationship_type)

The source initiates a callable function or operation.

Allowed node pairs (source -> targets):
- ui_frame -> function, http_operation, async_operation, rpc_operation
- job -> http_operation, async_operation, rpc_operation

## Relationship type: renders

Section ID: `schema.relationship-types.renders` (relationship_type)

The source produces or composes the target visual surface.

Allowed node pairs (source -> targets):
- component -> component, page, ui_component_definition
- page -> component
- ui_component_definition -> ui_frame

## Relationship type: reads_from

Section ID: `schema.relationship-types.reads_from` (relationship_type)

The source retrieves state or content from the target data resource.

Allowed node pairs (source -> targets):
- container -> database, object_store, cache
- workload -> database, object_store, cache
- website -> database, object_store, cache
- app -> database, object_store, cache
- api_gateway -> database, object_store, cache
- component -> cache, table, collection, bucket, queue
- ui_frame -> database
- function -> database, object_store, cache, table, collection, bucket, queue
- http_operation -> database, object_store, cache
- async_operation -> database, object_store, cache, topic, queue
- rpc_operation -> database, object_store, cache
- job -> database, object_store, cache, table, collection, bucket
- code -> database, object_store, cache, table, collection, bucket, queue

## Relationship type: writes_to

Section ID: `schema.relationship-types.writes_to` (relationship_type)

The source persists or transmits state to the target data resource.

Allowed node pairs (source -> targets):
- container -> database, object_store, cache
- workload -> database, object_store, cache
- website -> database, object_store, cache
- app -> database, object_store, cache
- api_gateway -> database, object_store, cache
- component -> cache, table, collection, bucket, topic, queue
- ui_frame -> database
- function -> database, object_store, cache, table, collection, bucket, topic, queue
- http_operation -> database, object_store, cache
- async_operation -> database, object_store, cache, topic, queue
- rpc_operation -> database, object_store, cache
- job -> database, object_store, cache, table, collection, bucket, topic, queue
- code -> database, object_store, cache, table, collection, bucket, topic, queue

## Relationship type: executes

Section ID: `schema.relationship-types.executes` (relationship_type)

The source runs or dispatches the target behavior or runtime unit.

Allowed node pairs (source -> targets):
- system -> http_operation, rpc_operation, async_operation, function
- container -> workload, job
- workload -> function, http_operation, async_operation, rpc_operation, job
- database -> function
- object_store -> function
- message_broker -> async_operation
- cache -> function
- api_gateway -> function, http_operation, async_operation, rpc_operation
- collection -> function, async_operation
- bucket -> function, async_operation
- topic -> async_operation
- queue -> async_operation
- component -> function, http_operation, async_operation, rpc_operation
- page -> function, http_operation, async_operation, rpc_operation
- ui_frame -> function, http_operation, async_operation, rpc_operation
- function -> function, async_operation
- http_operation -> function
- async_operation -> function
- rpc_operation -> function
- job -> function, http_operation, async_operation, rpc_operation
- code -> code

## Relationship type: implements

Section ID: `schema.relationship-types.implements` (relationship_type)

The pair connects intent or structure with a concrete realization; valid direction depends on the curated node-type pairing.

Allowed node pairs (source -> targets):
- system -> context, container, workload, database, object_store, message_broker, cache, website, app, api_gateway
- story -> component, page, ui_component_definition, function, http_operation, async_operation, rpc_operation
- process -> component, page, ui_component_definition, function, http_operation, async_operation, rpc_operation
- decision -> component, page, ui_component_definition, function
- end -> goal
- container -> table, collection, bucket, topic, queue, component, page, function, http_operation, async_operation, rpc_operation, job
- workload -> function, http_operation, async_operation, rpc_operation, job
- database -> table, collection, function, schema, code
- object_store -> bucket
- message_broker -> topic, queue, async_operation
- website -> component, page, function, http_operation, async_operation, rpc_operation
- app -> component, page, function, http_operation, async_operation, rpc_operation
- library -> component, ui_component_definition, function, schema, code
- api_gateway -> function, http_operation, async_operation, rpc_operation
- table -> code
- collection -> code
- bucket -> code
- topic -> async_operation, code
- queue -> async_operation, code
- component -> code
- page -> code
- ui_component_definition -> ui_frame, function, http_operation, async_operation, rpc_operation, code
- ui_frame -> story, ui_component_definition, code
- function -> http_operation, async_operation, rpc_operation, code
- http_operation -> function, code
- async_operation -> function, code
- rpc_operation -> function, code
- job -> code

## Relationship type: publishes

Section ID: `schema.relationship-types.publishes` (relationship_type)

The source emits messages or events to the target topic or queue.

Allowed node pairs (source -> targets):
- component -> topic, queue
- function -> topic, queue
- async_operation -> topic, queue
- job -> topic, queue
- code -> topic, queue

## Relationship type: foreign_keys_to

Section ID: `schema.relationship-types.foreign_keys_to` (relationship_type)

A relational table contains a foreign-key reference to the target table.

Allowed node pairs (source -> targets):
- table -> table

## Relationship type: schema_ref

Section ID: `schema.relationship-types.schema_ref` (relationship_type)

The source uses the target schema as a structured data contract.

Allowed node pairs (source -> targets):
- collection -> schema
- function -> schema
- http_operation -> schema
- async_operation -> schema
- rpc_operation -> schema
- schema -> schema

## Relationship type: imports

Section ID: `schema.relationship-types.imports` (relationship_type)

The source has a build-time dependency on the target reusable artifact.

Allowed node pairs (source -> targets):
- ui_component_definition -> ui_component_definition
- ui_frame -> ui_component_definition

## Relationship type: journey_continuation

Section ID: `schema.relationship-types.journey_continuation` (relationship_type)

After the source story's outcome (an end node), the actor continues with a different story (its start node); journeys are named by a story's journey_entry label.

Allowed node pairs (source -> targets):
- end -> start

## Relationship type: available_on

Section ID: `schema.relationship-types.available_on` (relationship_type)

The source story must be doable on the target surface (a website, app, plugin or CLI component, API gateway, or a page or operation for part of one); order says the order surfaces are built in, and deferred marks a surface required later. It says required, not built: implements says built.

Allowed node pairs (source -> targets):
- story -> website, app, api_gateway, component, page, ui_component_definition, function, http_operation, async_operation, rpc_operation

## Relationship type: instantiates

Section ID: `schema.relationship-types.instantiates` (relationship_type)

A post staffs the target job_function in its team; a post has exactly one.

Allowed node pairs (source -> targets):
- post -> job_function

## Relationship type: fills

Section ID: `schema.relationship-types.fills` (relationship_type)

Holders of the source job_function perform the target workflow slot.

Allowed node pairs (source -> targets):
- job_function -> slot

## Relationship type: grants

Section ID: `schema.relationship-types.grants` (relationship_type)

The source job_function or access_policy confers the target access_role. A grant from a job_function names its scope (team, team_subtree, org, or none); an access_policy has exactly one grant, with no scope.

Allowed node pairs (source -> targets):
- job_function -> access_role
- access_policy -> access_role

## All relationship distinctions

Section ID: `schema.conceptual-pairings` (conceptual_pairing)

depends_on vs uses: Use depends_on for a required dependency that affects validity or responsibility. Use uses when the source consumes a target capability without asserting that stronger dependency.
uses vs integrates_with: Use uses for directional consumption. Use integrates_with for a deliberate peer-to-peer or boundary-crossing integration where neither side is merely an implementation detail of the other.
calls vs executes: Use calls for invocation intent from a UI or behavior source. Use executes for the runtime or dispatch relationship that runs a function, operation, or workload.
reads_from vs writes_to vs publishes: Use reads_from and writes_to for state or content flow. Use publishes specifically when emitting messages or events to a topic or queue.
implements vs parent hierarchy: Use hierarchy for ownership and membership, such as product → feature → story or story → flow step. Use implements only for an allowed semantic realization pairing; do not add edges merely to repeat containment.
schema_ref vs foreign_keys_to: Use schema_ref when a behavior or contract references a reusable schema. Use foreign_keys_to only for a relational table-to-table foreign-key relationship.
imports vs depends_on: Use imports for a concrete build dependency. Keep depends_on for broader semantic dependency; it does not by itself define build ordering.
actor vs job_function vs access_role vs slot: Four types answer "a role". Use actor for someone who uses the product, job_function for a job in the organization that builds or runs it, access_role for a named set of actions that grants confer, and slot for a part a workflow step needs someone to play, which job functions fill. Workflows still name their roles as role actors until workflow roles become slots.

## depends_on vs uses

Section ID: `schema.conceptual-pairings.depends_on-uses` (conceptual_pairing)

Use depends_on for a required dependency that affects validity or responsibility. Use uses when the source consumes a target capability without asserting that stronger dependency.

## uses vs integrates_with

Section ID: `schema.conceptual-pairings.uses-integrates_with` (conceptual_pairing)

Use uses for directional consumption. Use integrates_with for a deliberate peer-to-peer or boundary-crossing integration where neither side is merely an implementation detail of the other.

## calls vs executes

Section ID: `schema.conceptual-pairings.calls-executes` (conceptual_pairing)

Use calls for invocation intent from a UI or behavior source. Use executes for the runtime or dispatch relationship that runs a function, operation, or workload.

## reads_from vs writes_to vs publishes

Section ID: `schema.conceptual-pairings.reads_from-writes_to-publishes` (conceptual_pairing)

Use reads_from and writes_to for state or content flow. Use publishes specifically when emitting messages or events to a topic or queue.

## implements vs parent hierarchy

Section ID: `schema.conceptual-pairings.implements-parent-hierarchy` (conceptual_pairing)

Use hierarchy for ownership and membership, such as product → feature → story or story → flow step. Use implements only for an allowed semantic realization pairing; do not add edges merely to repeat containment.

## schema_ref vs foreign_keys_to

Section ID: `schema.conceptual-pairings.schema_ref-foreign_keys_to` (conceptual_pairing)

Use schema_ref when a behavior or contract references a reusable schema. Use foreign_keys_to only for a relational table-to-table foreign-key relationship.

## imports vs depends_on

Section ID: `schema.conceptual-pairings.imports-depends_on` (conceptual_pairing)

Use imports for a concrete build dependency. Keep depends_on for broader semantic dependency; it does not by itself define build ordering.

## actor vs job_function vs access_role vs slot

Section ID: `schema.conceptual-pairings.actor-job_function-access_role-slot` (conceptual_pairing)

Four types answer "a role". Use actor for someone who uses the product, job_function for a job in the organization that builds or runs it, access_role for a named set of actions that grants confer, and slot for a part a workflow step needs someone to play, which job functions fill. Workflows still name their roles as role actors until workflow roles become slots.

## All canonical examples

Section ID: `schema.examples` (example)

Product intent and story flow: Use hierarchy for product membership and semantic edges for actor intent and ordered story behavior.
UI to API and data: Connect visible interaction, reusable UI, operation contracts, schemas, behavior, and persistence without collapsing them into one node.
Asynchronous publication: Distinguish broker ownership, event publication, and asynchronous execution.

## Product intent and story flow

Section ID: `schema.examples.product-intent-and-story-flow` (example)

Use hierarchy for product membership and semantic edges for actor intent and ordered story behavior.
product: product — Delivery product
feature: feature — Track delivery (parent: product)
story: story — Track an order (parent: feature)
actor: actor — Customer
system: system — Order system
goal: goal — Know delivery status (parent: system)
start: start — Open tracking (parent: story)
process: process — Load status (parent: story)
end: end — Status shown (parent: story)
actor -[pursues]-> goal: The customer wants the delivery-status outcome.
actor -[interacts]-> story: The customer participates in this story.
goal -[depends_on]-> story: The goal depends on the concrete story behavior.
start -[precedes]-> process: The entry step occurs before loading status.
process -[precedes]-> end: Loading status leads to the terminal outcome.

## UI to API and data

Section ID: `schema.examples.ui-to-api-and-data` (example)

Connect visible interaction, reusable UI, operation contracts, schemas, behavior, and persistence without collapsing them into one node.
actor: actor — Customer
website: website — Customer web
page: page — Tracking page (parent: website)
frame: ui_frame — Tracking loaded (parent: page)
ui_definition: ui_component_definition — Tracking card
operation: http_operation — GET /tracking
schema: schema — Tracking response
function: function — Read tracking status
table: table — shipments
actor -[interacts]-> page: The customer interacts with the tracking page.
frame -[uses]-> ui_definition: The concrete frame uses the reusable tracking-card definition.
frame -[calls]-> operation: The frame initiates the tracking operation.
operation -[schema_ref]-> schema: The operation uses the response schema contract.
operation -[executes]-> function: The operation dispatches the implementation behavior.
function -[reads_from]-> table: The function reads shipment state.

## Asynchronous publication

Section ID: `schema.examples.asynchronous-publication` (example)

Distinguish broker ownership, event publication, and asynchronous execution.
context: context — Delivery platform
container: container — Order service (parent: context)
component: component — Order publisher (parent: container)
broker: message_broker — Event broker (parent: context)
topic: topic — order.updated (parent: broker)
operation: async_operation — Consume order update (parent: container)
container -[uses]-> broker: The service consumes the broker capability.
component -[publishes]-> topic: The component emits order updates.
topic -[executes]-> operation: Messages on the topic dispatch the asynchronous operation.
