---
title: "A Custom Multi-Selection Spark DropDownList"
date: "2010-06-24"
categories: 
  - "flashflex"
---

I just had to add a drop down list into my Flex 4 project, but I wanted to be able to multi-select the items, and add some custom logic.  It was sort of a pain in the butt figuring out how to do this, so I thought I'd share!

So, first of all, I created a new class that overrode DropDownList.  I added this "MultiSelectionDropDownList" to my application.  I set the width to 300, set "requireSelection" to false (since we're allowing checkbox selection which the DDList wouldn't know about), and set up a data provider with a few items in my list.

All normal everyday Spark DropDownList stuff so far, right?  OK, next, lets create a skin for the list.  The only reason I do this is to remove the "maxHeight" for the list.  I don't want my list to scroll....because frankly, this isn't the greatest example and will break when my list items are outside the viewable area.

Next I'll add an item renderer.  The item renderer will be a normal background, and a HGroup on top of it which shows a label and a checkbox (needs an ID for access).  Pretty simple stuff so far!

Now, I have my multiselection dropdown in my application like so:

At this point we should have a functional drop down showing some items with checkboxes. Of course those checkboxes don't work yet, and we'll need to add some logic.

Let's dive into the class we created that overrides the DropDownList - the "MultiSelectionDropDown".

The first thing I want to do is in the constructor - I want to add an event listener for when the list opens:

```
		public function MultiSelectionDropDown()
		{
			super();
			this.addEventListener(DropDownEvent.OPEN, onOpen, false, 0, true);
		}
	
		public function onOpen(event:DropDownEvent):void {
			activateAllCheckBoxes();
		}		
		

```

So now, whenever someone clicks and opens the list, we'll be "activating" all of our check boxes. What does this mean? Well, we're going to loop through all of our list items, and add some event listeners to these checkboxes.

```
		protected function activateAllCheckBoxes():void {
			for (var c:int = 0; c < dataGroup.numElements; c++) {
				var obj:MultiSelectItemRenderer = dataGroup.getElementAt(c) as MultiSelectItemRenderer;
					
				obj.checkbox.addEventListener(MouseEvent.MOUSE_DOWN, mouseCheckBox, false, 0, true);
				obj.checkbox.addEventListener(MouseEvent.MOUSE_UP, mouseCheckBox, false, 0, true);
				obj.checkbox.addEventListener(Event.CHANGE, changeCheckBoxSelection, false, 0, true); 
}

		protected function mouseCheckBox(event:Event):void {
			event.stopImmediatePropagation();
		}

```

OK, so we've added some event listeners. I'll get to the actual code to change the checkbox selection in a sec - but check out "mouseCheckBox". Here we're grabbing the event, and stopping it's propagation. This means that the buck stops here when you click a check box. The event won't make it's way down to your item, and won't select your item in the list and close the dropdown. Great! Cause, we want to make multiple selections without having to bother with opening the list over and over again.

Now, lets focus on the actual clicking of the checkbox:

```
		protected function changeCheckBoxSelection(event:Event):void {
			currentlySelectedCheckBoxes = selectedCheckboxes;
			
			// turn on multi-view mode
			if (event.currentTarget.selected == true ) {
				selectedIndex = -1;
				labelDisplay.text = "multiple selections";
			}
			
			dispatchEvent(new Event("selectionChange"));
		}

		protected function get selectedCheckboxes():Array {
			var returnList:Array = new Array();
			for (var c:int = 0; c < dataGroup.numElements; c++) {
				var obj:MultiSelectItemRenderer = dataGroup.getElementAt(c) as MultiSelectItemRenderer;
				if (obj && obj.checkbox.selected) {
					returnList.push(obj.data);
				}
			}
			return returnList;
		}

```

So here everytime I click a checkbox, if I turned it on (or checked it), I change the label display to indicate that I'm making multiple selections and set the selected item index to -1. This will make the list indicate to the user that nothing is selected, but we're in "multiple selection mode".

Additionally, I'm saving the array of my "currentlySelectedCheckBoxes". I get this array by looping through my items again, and looking at the checkbox testing if it's selected.

Once this is saved, I dispatch a "selectionChange" event. What's this? Well, I made it up, and I'm only using it internally in this class. Who's listening? This guy....

```
[Bindable(event="selectionChange")]
	public function get selectedViews():Array {
		var multiSelect:Array = selectedCheckboxes;
		if (multiSelect.length > 0) {
			return multiSelect;
		} else {
			return [selectedItem];
		}
	}

```

This is a bindable function to provided external access to the array of selected items in the list, whether they are selected through the checkboxes, or just selected in non-multi-selection mode just by clicking on the list item.

Let's also improve the experience by using our saved array of "currentlySelectedCheckBoxes" and using that to populate the list when the list opens. You see, when our list closes, our items sorta....disappear. It's sort of annoying, but pretty nice for memory management. Anyway as we go through and add our event listeners when the list opens, we can check if the checkbox is in our saved list, and force it to check itself:

```
protected function activateAllCheckBoxes():void {
	for (var c:int = 0; c < dataGroup.numElements; c++) {
		var obj:MultiSelectItemRenderer = dataGroup.getElementAt(c) as MultiSelectItemRenderer;
			if (obj) {
				// no check box here, this playback mode only is a solo view
				if (dataProvider.getItemAt(c) == "Select This Item Only" ) {
					obj.checkbox.visible = false;
				}
					
				// find and check of previously checked boxes
				if ( currentlySelectedCheckBoxes.indexOf(dataProvider.getItemAt(c)) != -1 ) {
					obj.checkbox.selected = true;
				}
					
				obj.checkbox.addEventListener(MouseEvent.MOUSE_DOWN, mouseCheckBox, false, 0, true);
				obj.checkbox.addEventListener(MouseEvent.MOUSE_UP, mouseCheckBox, false, 0, true);
				obj.checkbox.addEventListener(Event.CHANGE, changeCheckBoxSelection, false, 0, true);
			}
		}
	}

```

But that's not all! I've added a "solo-selection" click in my dropdown. Clicking this "solo-selection" will clear out all checkmarks and start from scratch - exiting the multiple selection mode. You might notice that I snuck in a line to hide the checkbox if the list item is that "Select this item only" item. That's because it's SOLO selection and it doesn't get a checkbox so we can select it and other items.

```
override protected function item_mouseDownHandler(event:MouseEvent):void {
	// launch solo view mode when clicking "playback only"
	if ( event.currentTarget.data == "Select This Item Only" ) {
		deselectAllCheckBoxes();
	}
			
	if (selectedCheckboxes.length == 0) {
		super.item_mouseDownHandler(event);	
		dispatchEvent(new Event("selectionChange"));
	} else {
		closeDropDown(false);
	}
}

protected function deselectAllCheckBoxes():void {
	currentlySelectedCheckBoxes = [];
	for (var c:int = 0; c < dataGroup.numElements; c++) {
		var obj:MultiSelectItemRenderer = dataGroup.getElementAt(c) as MultiSelectItemRenderer;
		if (obj) {
			obj.checkbox.selected = false;
		}
	}
}

```

To accomplish this, I overrode the "item\_mouseDownHandler". Inside here, I said, "if you're that solo button, let's deselect all the checkboxes". To deselect, I simply went through each item in the datagroup, accessed it's checkbox and turned off the selected property.

I also used this function to determine if we were in multiple selection mode - if so, then close the dropdown list without committing and values. If I wasn't in multiple selection mode, then just do what the list does normally - except dispatch that change event so our custom bindable property updates any outside listeners that our selection has changed (even though it's just a single item now in the array).

Finally the very last thing I did....

```
protected override function dropDownController_closeHandler(event:DropDownEvent):void
{
	if (currentlySelectedCheckBoxes.length > 0) {
		// if checkboxes are selected prevent the default behavior,
		// which is to set a selection index
		event.preventDefault();
	}
	super.dropDownController_closeHandler(event);
}

```

When closing the list, normal behavior is to commit a selection. I actually don't know the details of what it was doing - but it was grabbing a selection from somewhere and producing some funky results I didn't want if I had multiple checkboxes selected. It would update the label property and selected item with the last thing I selected in my normal list (even if it was a while ago). It's like the list was remembering something from somewhere and competing with me! Not good.

So, I overrode the close handler. If I had multiple things selected, I stole the event, and called preventDefault(). In the DropDownListBase class, it sees this default is prevented and doesn't try to commit whatever the heck it's trying to commit. It's just lets it be, and closes the list and doesn't change anything.

That's it! You can see the list in action, and right click to view the source here:

[Multi-Select DropDown](http://blastanova.com/labs/multiselectdropdown/CustomMultiSelectDropDown.html)

It's such a tiny thing, but ended up being sort of a pain to figure out how to do - so hopefully I save someone else the pain. Oh and one more thing...I don't know that I'm necessarily advocating this kind of component yet. Might be kinda complicated in terms of useability. I'll find out as I use it in my project and tweak it.
