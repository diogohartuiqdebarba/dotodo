# Do TODO

DoTODO read a file and shows the list using the build/dotodo-<VERSION>.html in the browser.

### Marks

\# => h1
\## => h2
\### => h3
\_\_\_ => <hr>
@list-description => an italic h3 short list description
@todo => gray list item
@doing => yellow list item
@done => green strikethrough list item
@canceled => red strikethrough list item

### Example list file:

```
# My Test List

A short description of my test list... @list-description

## Art

model 1 @doing
model 2 @todo
model 3 @todo

## Sound

music 1 @done
sound 2 @todo
```
