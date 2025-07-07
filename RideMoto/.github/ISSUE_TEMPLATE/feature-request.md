name: ✨ Feature Request
description: Sugira uma nova funcionalidade ou melhoria
title: "[Feature] "
labels: [enhancement]
body:
  - type: textarea
    id: descricao
    attributes:
      label: Descrição da funcionalidade
      placeholder: Explique o que deseja implementar ou melhorar
      description: Seja claro e objetivo
    validations:
      required: true
  - type: textarea
    id: beneficio
    attributes:
      label: Qual benefício isso traz?
      placeholder: Por que essa feature seria útil?
