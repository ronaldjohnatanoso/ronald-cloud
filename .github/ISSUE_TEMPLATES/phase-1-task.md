name: "🚀 Phase 1 Task"
description: "Tasks specific to Phase 1 — Digital Identity Platform"
title: "[Phase 1] "
labels: ["phase-1"]
projects: []
assignees: []

body:
  - type: markdown
    attributes:
      value: |
        ## Task Details

  - type: input
    id: area
    attributes:
      label: "Area"
      description: "Which part of Phase 1 does this belong to?"
      placeholder: "e.g. Azure Foundation, Frontend, Backend, DNS"
    validations:
      required: true

  - type: textarea
    id: todo
    attributes:
      label: "TODO"
      description: "Specific steps to complete"
      placeholder: |
        - [ ] step 1
        - [ ] step 2
    validations:
      required: true

  - type: textarea
    id: notes
    attributes:
      label: "Notes"
      description: "Any relevant context, links, blockers"
      value: ""
