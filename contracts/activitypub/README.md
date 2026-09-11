# ActivityPub Contract Profile

> Status: Normative contract profile, version 1

PSDC social implementations conform to W3C ActivityPub and ActivityStreams 2.0,
WebFinger and NodeInfo. The portable profile requires Person, Group, Service and
Application actors; Note, Article, Image, Video, Audio and Event objects; and
Create, Update, Delete, Follow, Accept, Reject, Undo, Like, Announce, Add, Remove,
Block and Flag activities when supported by the declared capability document.

Extensions use globally unique HTTPS context terms, remain ignorable by receivers,
and never replace a standard field. Delivery authenticates the remote actor,
checks freshness and replay, applies local federation and moderation policy,
deduplicates by activity ID, bounds body and media size, and records an auditable
decision. Delete and Undo propagate according to protocol and local retention law.

Every server publishes its supported profile, moderation contact, actor domain,
media policy and capability limits and passes the common controlled-peer,
signature, replay, deletion, block, report and failure-isolation suite.
