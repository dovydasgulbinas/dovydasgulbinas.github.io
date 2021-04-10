Initiliazing python byte objects with value of 0b1111...


## Context

After trying to implement my own "one time pad (OTP)" file encryption.  I ran into an issue that
I needed large byte object sequence to write proper unit tests for encryption/decryption.

For those who don't know python has a special `bytes` object which stores "raw"
data so to speak.  example of `bytes` in action:

    >>> bytes(2)
    b'\x00\x00'

`bytes` output explained:

    b'...'   - indicates the the output is a byte string
    \x       - escapes 'x' character with '\'. 'x' indicates that output in hex
    \x00     - 0 in hex.  Also could be written as 00000000 in binary
    \x00\x00 - since we created 2 bytes we 2 bytes stored


## Goal

To write a small function for generating N bytes that are always 0b1111..
e.g. 

    `one_flood(1) -> b'\xff'`         # 0b11111111 255 in decimal
    `one_flood(2) -> b'\xff\xff'`     # 0b11111111 11111111, 65535 in decimal
    `one_flood(3) -> b'\xff\xff\xff'` # 0b11111111 11111111 11111111,  16777215 in decimal
    ...


## Proposed Solution

It should be noted that this code will only(reliably) work from python version >=3.7.


```
def one_flood(self, n_bytes: int):
    M = 0b11111111  # 255
    a = 0
    for _ in range(n_bytes):
        # on first iteration (a = 0) right shift (<<) does nothing.
        # only the OR operator (|) transforms a=0 -> a=255
        a = (a << 8) | M

    return a.to_bytes(n_bytes, "big")
```

Why python >= 3.7?:

From this version and up `int` object has the ability to
increase its size in bytes it variable if can't store any more data.  On older
versions of python `int` object would simply overflow. Now this does not happen
so theoretically `int` can now be of any size.


why do we need `int` objects if we are creating `bytes`?:

unfortunatelly python does not support bitwise and logical operations on `bytes`
object this means that we must use `int` objects for that.


## Further Reading

by [1](https://stackoverflow.com/questions/2612720/how-to-do-bitwise-exclusive-or-of-two-strings-in-python)


;[1]: https://stackoverflow.com/questions/2612720/how-to-do-bitwise-exclusive-or-of-two-strings-in-python
;layout: post
;comments: True
;date: 2019-06-21 14:49:17
;date_updated: 
;tags: default
