---
title: Relikvie družiny
---

```base
filters:
  and:
    - file.ext == "md"
    - file.inFolder("kampan/relikvie")
    - file.name != "index"
formulas:
  relikvia: file.asLink(title)
properties:
  formula.relikvia:
    displayName: Relikvia
  naboje:
    displayName: Náboje
  description:
    displayName: Čo robí
views:
  - type: table
    name: Všetky relikvie
    order:
      - formula.relikvia
      - naboje
      - description
```
