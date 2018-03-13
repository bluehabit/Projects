`v3` is the preferred version becuase it attaches event handlers to the object for example 

```
  editButton.addEventListener('click', function(){
  	editTask(this);
  });
```
Instead of a function property expression, disadvantage to doing it this way is you can only listen for one type of event. With `addEventListener` you can listen for multiple events on the same object.

```
 editButton.onclick = editTask;
```


![f](https://imgur.com/yuXL4CU.png)
