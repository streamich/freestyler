
# Apply inline styles

Assume you have a DOM element `el`.

  1. `el.style.color = 'tomato';`
  2. `el.style.setProperty('color', 'tomato');`
  3. `el.style.cssText = 'color: tomato';`
  4. `el.setAttribute('style', 'color: tomato');`
  5. <style>.a {color: tomato}</style> `el.className += ' a';`
  6. <style>[data-a] {color: tomato}</style> `el.setAttribute('data-a');`

### Results

##### 1 style

  - https://jsbench.me/blj9wn17tk/3

  1. `setProperty`
  2. `style.color`
  3. `style.cssText`
  4. `setAttribute`

##### 2 styles

 - https://jsbench.me/hqj9wog5qu/2

  1. `setProperty`
  2. `style.color`
  3. `style.cssText`
  4. `setAttribute`

##### 4 styles

 - https://jsbench.me/f0j9wovrsa/2

  1. `setProperty`
  2. `style.color`
  3. `style.cssText`
  4. `setAttribute`

##### 8 styles

 -


# Set CSS variables

# Update CSS variables

# Apply CSS selector

# CSS rule

# Media at-rule

# CSS sheet

