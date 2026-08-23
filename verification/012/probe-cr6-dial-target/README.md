# CR round 6 — `pg` dials the host its `Client` reports

**Built by**: code-reviewer, 2026-08-23, post-refresh pass against website `17cada0`.
**Discharges**: the round-4 Assumption Not Checked — *"`pg` dials the host its `Client`
constructor reports."* Registered at round 4, carried through round 5, settled here.

## Why the round-5 instrument did not settle this

`probe-cr5-override-guard/param-class.js` established what `pg-connection-string` **computes** —
which host ends up in `config.host` for each member of the query-parameter class. That is a claim
about a parser. The assumption is about a **socket**: that the value pg reports is the value pg
actually dials. An instrument's validity is indexed to the claim it was built for, and the claim
changed, so the instrument had to.

## Oracle, fixed before running

A real **TCP `connection` event observed at a loopback listener**. Not the client's reported
config (that is the thing under test, so it cannot also be the oracle), and not an error string —
`ENOTFOUND` vs a handshake failure would have let a case pass for the wrong reason.

Both directions are asserted: a case that must connect, and a case that must **not**.

## Confirmation gate

`gate()` refuses any host but `127.0.0.1`. A probe whose purpose is to demonstrate that a dial
reaches its stated target must never be pointed at production to demonstrate it. The round-4
finding this descends from concerned a guard on an irreversible production action; proving it out
against the database it protects would be the harm it guards against.

## Result

    control: authority=loopback         reportedHost=127.0.0.1            socketObserved=true   expected=true
    control: authority=unresolvable     reportedHost=no.such.host.invalid socketObserved=false  expected=false
    subject: ?host= overrides authority reportedHost=127.0.0.1            socketObserved=true   expected=true

    RESULT: pg dials the host it reports — assumption DISCHARGED

The negative control fired (`ENOTFOUND`, no socket), so the oracle can register **absence** — a
listener that never fires proves nothing unless something makes it fire and something else does
not. The subject case is the discriminating one: the authority is unresolvable, so a socket at the
listener can only mean pg dialled `config.host`, which is also what it reported.

## Blind spots, stated at authoring time

- Loopback only. It does not establish behaviour for a host that resolves but is unreachable, or
  for TLS-wrapped dials where a proxy could intervene between `config.host` and the socket.
- It observes the **first** dial. pg's pool retry/failover behaviour is not exercised.
- `hostaddr` is not covered because pg 8.11.1 does not implement it — established at round 5; it
  is not a member of the class rather than an untested member.

## Reproduce

    node agent-output/verification/012/probe-cr6-dial-target/dial-target.js

Exit 0 = discharged. Captured run: `run-dial-target.txt`.
