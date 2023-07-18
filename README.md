# Module

在两个 module 中形成循环依赖后，会导致程序运行失败，处理方式为就是先单独创建这两个 module，然后再让这两者关联起来，也就是用 `forwardRef`

> Module 和 Module 之间会循环依赖以外，provider 之间也会
