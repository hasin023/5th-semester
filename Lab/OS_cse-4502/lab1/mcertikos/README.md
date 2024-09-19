# mCertikOS

A micro certified OS kernel implemented in C. It is a simple kernel that can be used to learn the basics of OS development. We can run the `.img` file in QEMU.

## Compilation

```bash
make   # or
make all
```

## Run tests

```bash
make clean && make TEST=1
```

## Run in qemu

```bash
make qemu   # or
make qemu-nox
```

## Debug with gdb

```bash
make qemu-gdb   # or
make qemu-nox-gdb
```
