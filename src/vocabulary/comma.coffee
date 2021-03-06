addVocabulary

  ',': (⍵, ⍺, axis) ->
    if ⍺

      # 10,66               ←→ 10 66
      # '10 ','MAY ','1985' ←→ '10 MAY 1985'
      # (2 3⍴⍳6),2 2⍴⍳4     ←→ 2 5⍴(0 1 2 0 1  3 4 5 2 3)
      # (3 2⍴⍳6),2 2⍴⍳4     !!! LENGTH ERROR
      # (2 3⍴⍳6),9          ←→ 2 4⍴(0 1 2 9  3 4 5 9)
      # (2 3 4⍴⍳24),99      ←→ 2 3 5⍴(0  1  2  3 99
      # ...                           4  5  6  7 99
      # ...                           8  9 10 11 99
      # ...
      # ...                          12 13 14 15 99
      # ...                          16 17 18 19 99
      # ...                          20 21 22 23 99)
      # ⍬,⍬                 ←→ ⍬
      # ⍬,1                 ←→ ,1
      # 1,⍬                 ←→ ,1
      nAxes = Math.max ⍴⍴(⍺), ⍴⍴(⍵)
      if axis
        axis = axis.unwrap()
        if typeof axis isnt 'number' then domainError()
        if nAxes and !(-1 < axis < nAxes) then rankError()
      else
        axis = nAxes - 1

      if ⍴⍴(⍺) is ⍴⍴(⍵) is 0
        return new A [⍺.unwrap(), ⍵.unwrap()]
      else if !⍴⍴ ⍺
        s = ⍴(⍵)[..]
        if isInt axis then s[axis] = 1
        ⍺ = new A [⍺.unwrap()], s, repeat([0], ⍴⍴ ⍵)
      else if !⍴⍴ ⍵
        s = ⍴(⍺)[..]
        if isInt axis then s[axis] = 1
        ⍵ = new A [⍵.unwrap()], s, repeat([0], ⍴⍴ ⍺)
      else if ⍴⍴(⍺) + 1 is ⍴⍴ ⍵
        if !isInt axis then rankError()
        shape = ⍴(⍺)[..]
        shape.splice axis, 0, 1
        stride = ⍺.stride[..]
        stride.splice axis, 0, 0
        ⍺ = new A ⍺.data, shape, stride, ⍺.offset
      else if ⍴⍴(⍺) is ⍴⍴(⍵) + 1
        if !isInt axis then rankError()
        shape = ⍴(⍵)[..]
        shape.splice axis, 0, 1
        stride = ⍵.stride[..]
        stride.splice axis, 0, 0
        ⍵ = new A ⍵.data, shape, stride, ⍵.offset
      else if ⍴⍴(⍺) isnt ⍴⍴(⍵)
        rankError()

      assert ⍴⍴(⍺) is ⍴⍴(⍵)
      for i in [0...⍴⍴ ⍺] by 1
        if i isnt axis and ⍴(⍺)[i] isnt ⍴(⍵)[i]
          lengthError()

      shape = ⍴(⍺)[..]
      if isInt axis
        shape[axis] += ⍴(⍵)[axis]
      else
        shape.splice Math.ceil(axis), 0, 2
      data = Array prod shape
      stride = Array shape.length
      stride[shape.length - 1] = 1
      for i in [shape.length - 2 .. 0] by -1
        stride[i] = stride[i + 1] * shape[i + 1]

      if isInt axis
        rStride = stride
      else
        rStride = stride[..]
        rStride.splice Math.ceil(axis), 1

      if !⍺.empty()
        r = 0 # pointer in data (the result)
        p = ⍺.offset # pointer in ⍺.data
        pIndices = repeat [0], ⍴⍴ ⍺
        loop
          data[r] = ⍺.data[p]
          a = pIndices.length - 1
          while a >= 0 and pIndices[a] + 1 is ⍴(⍺)[a]
            p -= pIndices[a] * ⍺.stride[a]
            r -= pIndices[a] * rStride[a]
            pIndices[a--] = 0
          if a < 0 then break
          p += ⍺.stride[a]
          r += rStride[a]
          pIndices[a]++

      if !⍵.empty()
        r = # pointer in data (the result)
          if isInt axis
            stride[axis] * ⍴(⍺)[axis]
          else
            stride[Math.ceil axis]
        q = ⍵.offset # pointer in ⍵.data
        pIndices = repeat [0], ⍴⍴ ⍵
        loop
          data[r] = ⍵.data[q]
          a = pIndices.length - 1
          while a >= 0 and pIndices[a] + 1 is ⍴(⍵)[a]
            q -= pIndices[a] * ⍵.stride[a]
            r -= pIndices[a] * rStride[a]
            pIndices[a--] = 0
          if a < 0 then break
          q += ⍵.stride[a]
          r += rStride[a]
          pIndices[a]++

      new A data, shape, stride

    else
      assert 0
