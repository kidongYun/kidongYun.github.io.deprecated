---
layout: post
title:  "Interpark - How to use the parallel stream"
date:   2020-03-23 11:21:54 +0900
categories: interpark java stream parallel
---

### 1. _.parallel()_ and _.sequential()_

> _Stream API_ has the _.parallel()_ function. It offers the parallel attrbute to the stream literally. You can use this function at the mid place and the calculations will be divided after calling this function. The below is the example how to add from 1 to n using the parallel stream.

```java

public long parallelSum(long n) {
    return Stream.iterate(1L, i->i+1)
            .limit(n)
            .parallel()
            .reduce(0L, Long::sum);
}

```

> You can change the type between sequential and parallel in the one stream either like the below.

```java

    stream().parallel()
            .filter(...)
            .sequential()
            .map(...)
            .parallel()
            .reduce();

```

### 2. the sort of overheads of the stream technique.

> If you are the novice of the parallel programming or _stream_ thing then you may misunderstand about what these new techniques are always better then the sequential or conventional things. but it's not truth. Because new techniques must have the additional task. for example the context switching or creating the new thread or translating the object type to primitive type, it's called _boxing_ and _unboxing_. so You have to consider about the overhead of new techniques when you use that.

#### boxing and unboxing

> Look at the below the code.

```java

public long sum() {
    final long N = 10_000_000L;
    return Stream.iterate(1L, i-> i + 1).limit(N).reduce(0L, Long::sum);
}

```

> It's the calculation using the sequential stream. but if you know the _boxing_ and _unboxing_, You can upgrade your code more effectively. the _method reference_ 'Long::sum' in the _reduce()_ function needs the object type of _long_. It's not a primitive type but the source and the result of the stream is the primitive type of _long_. so the above code must always translate the type between object and primitive of _long_. Actually It's really high cost. so the below is more faster than the above thing.

```java

public long sum() {
    final long N = 10_000_000L;
    return LongStream.iterate(1L, i -> i + 1).limit(N).reduce(0L, Long::sum);
}

```

> Change the from _Stream_ to _LongStream_. It's for the primitive type of _long_. then you don't need to translate betweens the types.

### Shared Variable.

> like the public toilet of which someone use that then the others can't use the toilet, the shared variables can be approached only one thread at a time for keeping the _MUTEX_ status. so the design needed the shared variable isn't well to the parallel technique. if you use just like that, It's more worse than sequential because of the overhead like the context swiching. the below code is the conventional design using the shared variable and the second thing is the same code using the stream.

```java

public long sum() {
    final long N = 10_000_000L;
    
    long result = 0;    // It's the shared variable.

    for(long i = 1L; i<= N; i++) {
        result += i;
    }

    return result;
}

```

```java

public long sum() {

    final long N = 10_000_000L;
    return LongStream.iterate(1L, i -> i + 1).limit(N).reduce(0L, Long::sum);

}

```

> They aren't useful code from the parallel perspective. _iterate()_ function of the _stream_ use the shared variables internally either. so when you use the parallel stream you should avoid the _iterate()_ function and use the _rangeClosed()_ function.

```java

public long sum() {
    final long N = 10_000_000L;
    return LongStream.rangeClosed(1, N).parallel().reduce(0L, Long::sum);
}

```

> _rangeClosed()_ function can divide the stream itself. and the divided streams are so useful to the parallel technique.