# LTAPPS Calendar PCF Control - Canvas Apps & Custom Pages Installation Guide

This guide provides step-by-step instructions for installing and configuring the LTAPPS Calendar PCF Control in Canvas Apps and Custom Pages. Follow these instructions to add rich calendar functionality to your applications.

## Overview

The LTAPPS Calendar PCF Control is a PowerApps Component Framework (PCF) control that brings powerful calendar features to Canvas Apps and Custom Pages. It provides an intuitive interface for displaying, filtering, and interacting with date-based data.

**Supported Platforms:**
- **Canvas Apps**: Standalone apps built with drag-and-drop interface
- **Custom Pages**: Model-driven app pages with Canvas-like experience

**Key Features:**
- Display events from Dataverse or collections
- Multiple view options (month, week, day)
- Refiner-based filtering
- Business rules for conditional formatting
- Action button event handling
- Responsive design for all devices

**Prerequisites:**
- Power Platform environment with Dataverse
- Canvas App or Custom Page creator access
- Basic understanding of Power Fx formulas
- LTAPPS Calendar solution package (`.zip` file)

---

## Installation Steps

### Step 1: Import the Solution

1. **Navigate to Power Apps**
   - Go to [https://make.powerapps.com](https://make.powerapps.com)
   - Select your environment from the top-right corner

2. **Open Solutions**
   - In the left navigation pane, click **Solutions**

3. **Import Solution**
   - Click **Import solution** at the top
   - Click **Browse** and select the LTAPPS Calendar solution file (`.zip`)
   - Click **Next**

4. **Review Solution Information**
   - Review the solution details
   - Click **Next**

5. **Configure Connections (if required)**
   - If prompted, configure any required connections
   - Click **Import**

6. **Wait for Import to Complete**
   - The import process may take a few minutes
   - Once completed, you'll see a success message
   - Click **Close**

---

### Step 2: Verify Installation

1. **Open the Imported Solution**
   - In the Solutions list, find and click on **LTAPPS Calendar**

2. **Check Components**
   - Verify the solution contains:
     - **Control**: LTAPPS Calendar PCF control
     - **Web Resources**: Supporting files

3. **Publish All Customizations** (if needed)
   - Click **Publish all customizations**

---

## Adding to Canvas Apps

### Step 1: Open or Create Canvas App

1. **Navigate to Apps**
   - In Power Apps, click **Apps** in the left navigation

2. **Create New or Edit Existing**
   - Click **+ New app** → **Canvas** to create new app, OR
   - Select an existing app and click **Edit**

### Step 2: Import the Component

1. **Open Insert Pane**
   - In the Canvas App Studio, click **Insert** in the left toolbar

2. **Get More Components**
   - At the top and click **Get more components** (or the folder icon)

3. **Select Code Components**
   - In the Import components dialog, click the **Code** tab

4. **Add LTAPPS Calendar**
   - Find **LTAPPS Calendar** in the list
   - Check the box next to it
   - Click **Import**

### Step 3: Add Control to Screen

1. **Insert the Control**
   - In the Insert pane, under **Code components**, click **LTAPPS Calendar**
   - The control will be added to your current screen

2. **Resize and Position**
   - Drag the control to your desired location
   - Resize it to fit your screen layout (recommended: full screen or large section)

### Step 4: Connect Data Source

1. **Add Data Source** (if not already added)
   - Click **Data** in the left toolbar
   - Click **+ Add data**
   - Search for and select your Dataverse table (e.g., Appointments, Events)
   - Or create a collection with your data

2. **Set Items Property**
   - Select the calendar control
   - In the properties pane on the right, find **Items**
   - Set the Items property to your data source:

   ```powerfx
   // From Dataverse table
   Filter(
       Appointments,
       StartDate >= StartOfMonth(Today()),
       EndDate <= EndOfMonth(Today())
   )
   ```

   Or

   ```powerfx
   // From collection
   colCalendarEvents
   ```

### Step 5: Map Dataset Fields

1. **Select the Calendar Control**
   - Click on the calendar control in your app

2. **Configure Field Mappings**
   - In the properties pane, scroll down to find dataset field mappings
   - Map each property to your data source columns:

   | Property | Your Entity Field |
   |----------|------------------|
   | Title | "ltcal_title" |
   | Start Date | "ltcal_startdate" |
   | End Date | "ltcal_enddate" |
   | Is All Day Event | "ltcal_isalldayevent" |
   | Is Recurring | "ltcal_isrecurring" |
   | Recurrence Pattern | "ltcal_recurrence" |
   | Refiner | "ltcal_refiner" |
   | Refiner Value ID | "ltcal_refinervalueid" |

   See [Dataset Configuration Guide](../configurations/dataset.md) for detailed field requirements.

### Step 6: Configure Calendar Properties

1. **Add Configuration Properties**
   - In the properties pane, configure calendar-specific settings:

   **Configuration** ([Configuration Guide](../configurations/configuration.md))
   ```powerfx
   {
       appType: "CanvasApp",
       defaultView: "month",
       fiscalYearSartMonth: 1,
       useRefiners: true,
       showRefinerPanel: true
   }
   ```

   **Refiners** ([Refiners Guide](../configurations/refiners.md))
   ```powerfx
   {
       isStaticValue: true,
       staticValue: ["Room", "Equipment", "Vehicle"]
   }
   ```

   **Refiner Values** ([Refiner Values Guide](../configurations/refinerValues.md))
   ```powerfx
   [
       {
           id: "room1",
           name: "Conference Room A",
           bgColor: "#0078D4",
           textColor: "#FFFFFF"
       }
   ]
   ```

   **Business Rules** ([Business Rules Guide](../configurations/bussinesRules.md))
   ```powerfx
   {
       highlights: [],
       actionButtons: [
           {
               id: "actionButton1",
               icon: "Edit",
               label: "Edit Event"
           }
       ]
   }
   ```

### Step 7: Handle Events

1. **Configure OnChange Property**
   - Select the calendar control
   - Find the **OnChange** property
   - Add Power Fx formula to handle events:

   ```powerfx
   // Handle action button clicks
   // OnChange event of the calendar control
    Set(varEventAction, Calendar4.eventActions);

    // Parse the action and handle accordingly
    If(
        varEventAction.actionName = "onAction1",
        /* Handle Action Button 1 */
        Navigate(DetailsScreen, Fade, {EventID: varEventAction.data});
        Notify("Action 1 executed", NotificationType.Success),
        
        varEventAction.actionName = "onAction2",
        /* Handle Action Button 2 */
        Patch(
            Events,
            LookUp(Events, ID = varEventAction.data),
            {Status: "Approved"}
        );
        Notify("Action 2 executed - Event approved", NotificationType.Success),
        
        varEventAction.actionName = "onAction3",
        /* Handle Action Button 3 */
        Set(varSelectedEventID, varEventAction.data);
        Set(varShowDialog, true);
        Notify("Action 3 executed", NotificationType.Success),
        
        varEventAction.actionName = "onAction4",
        /* Handle Action Button 4 */
        Notify("Action 4 executed with ID: " & varEventAction.data, NotificationType.Success),
        
        varEventAction.actionName = "onAction5",
        /* Handle Action Button 5 */
        Notify("Action 5 executed", NotificationType.Success),
        
        varEventAction.actionName = "onAction6",
        /* Handle Action Button 6 */
        Notify("Action 6 executed", NotificationType.Success),
        
        varEventAction.actionName = "onAction7",
        /* Handle Action Button 7 */
        Notify("Action 7 executed", NotificationType.Success),
        
        varEventAction.actionName = "onAction8",
        /* Handle Action Button 8 */
        Notify("Action 8 executed", NotificationType.Success),
        
        varEventAction.actionName = "onAction9",
        /* Handle Action Button 9 */
        Notify("Action 9 executed", NotificationType.Success),
        
        varEventAction.actionName = "onNewEvent",
        /* Handle New Event button */
        Navigate(NewEventScreen, ScreenTransition.None),
        
        varEventAction.actionName = "onOpenEvent",
        /* Handle event click */
        Navigate(EventDetailsScreen, Fade, {EventID: varEventAction.data}),
        
        varEventAction.actionName = "onDateChanged",
        /* Handle date change */
        Set(varSelectedDate, varEventAction.data);
        Notify("Date changed", NotificationType.Information)
    );
   ```

   See [Business Rules Guide](../configurations/bussinesRules.md) for detailed event handling patterns.

### Step 8: Save and Test

1. **Save Your App**
   - Click **File** → **Save**
   - Enter app name and description

2. **Test the Calendar**
   - Click **Play** (▶) to test in edit mode
   - Or click **Publish** to make available to users

3. **Verify Functionality**
   - Check that events display correctly
   - Test filtering with refiners
   - Click action buttons to verify event handling

---

## Adding to Custom Pages

### Step 1: Create or Open Custom Page

1. **Navigate to Solutions**
   - In Power Apps, click **Solutions**
   - Open your solution or create a new one

2. **Create Custom Page**
   - Click **+ New** → **Page**
   - Select **Custom page**
   - Choose a template or start blank

### Step 2: Import Component

1. **Open Insert Pane**
   - In the Custom Page designer, click **Insert**

2. **Get More Components**
   - Click **Get more components**

3. **Add LTAPPS Calendar**
   - Go to **Code** tab
   - Find and check **LTAPPS Calendar**
   - Click **Import**

### Step 3: Add Control to Page

1. **Insert the Control**
   - Under **Code components**, click **LTAPPS Calendar**
   - The control will be added to your page

2. **Resize and Position**
   - Adjust size and position as needed
   - Custom pages typically use full-width layouts

### Step 4: Connect to Dataverse

1. **Add Data Source**
   - Click **Data** in the left toolbar
   - Add your Dataverse table

2. **Set Items Property**
   - Select the calendar control
   - Configure the Items property:

   ```powerfx
   Filter(
       Events,
       StartDate >= DateAdd(Today(), -90),
       EndDate <= DateAdd(Today(), 90)
   )
   ```

### Step 5: Configure Properties

Follow the same configuration steps as Canvas Apps:
- Map dataset fields
- Configure calendar properties
- Set up refiners and business rules
- Handle events with OnChange

### Step 6: Add to Model-Driven App

1. **Save and Publish**
   - Save your custom page
   - Publish the solution

2. **Add to Model-Driven App**
   - Open your Model-Driven App designer
   - Click **+ Add page**
   - Select **Custom page**
   - Choose your calendar page

3. **Configure Navigation**
   - Add the page to your app navigation
   - Set display name and icon

---

## Data Source Options

### Option 1: Dataverse Table

Connect directly to a Dataverse table:

```powerfx
// Filter by date range
Filter(
    Appointments,
    StartDate >= StartOfMonth(Today()),
    EndDate <= EndOfMonth(Today())
)
```

**Advantages:**
- Real-time data
- Automatic updates
- Built-in delegation

### Option 2: Collection

Use a local collection:

```powerfx
// Create collection on screen load
ClearCollect(
    colEvents,
    {
        Title: "Team Meeting",
        StartDate: Today(),
        EndDate: Today(),
        IsAllDay: false
    }
)
```

**Advantages:**
- Better performance for small datasets
- Can combine multiple sources
- Supports calculated fields

### Option 3: SharePoint List

Connect to SharePoint:

```powerfx
Filter(
    'Calendar Events',
    StartDate >= StartOfMonth(Today())
)
```

### Option 4: Excel/CSV

Import data from Excel or CSV files:

```powerfx
// After importing as data source
Filter(
    EventsExcel,
    StartDate >= Today()
)
```

---

## Event Handling Patterns

### Pattern 1: Navigate to Detail Screen

```powerfx
// OnChange property
If(
    Calendar1.eventActions.actionName = "view",
    Navigate(DetailScreen, None, {selectedRecord: Calendar1.eventActions.data})
)
```

### Pattern 2: Edit Record

```powerfx
// OnChange property
If(
    Calendar1.eventActions.actionName = "edit",
    Patch(
        Appointments,
        LookUp(Appointments, ID = Calendar1.eventActions.data),
        {Status: "Updated"}
    )
)
```

### Pattern 3: Delete Record

```powerfx
// OnChange property
If(
    Calendar1.eventActions.actionName = "delete",
    Remove(Appointments, LookUp(Appointments, ID = Calendar1.eventActions.data))
)
```

### Pattern 4: Open Dialog

```powerfx
// OnChange property
If(
    Calendar1.eventActions.actionName = "details",
    Set(varShowDialog, true);
    Set(varSelectedEvent, LookUp(Appointments, ID = Calendar1.eventActions.data))
)
```

---

## Common Formulas

### Filter by Current Month

```powerfx
Filter(
    Events,
    StartDate >= StartOfMonth(Today()),
    EndDate <= EndOfMonth(Today())
)
```

### Filter by Date Range Variable

```powerfx
Filter(
    Events,
    StartDate >= varStartDate,
    EndDate <= varEndDate
)
```

### Filter by User

```powerfx
Filter(
    Appointments,
    Owner.Email = User().Email
)
```

### Add New Event

```powerfx
Patch(
    Appointments,
    Defaults(Appointments),
    {
        Title: txtTitle.Text,
        StartDate: datStart.SelectedDate,
        EndDate: datEnd.SelectedDate
    }
)
```

### Update Event

```powerfx
Patch(
    Appointments,
    LookUp(Appointments, ID = varSelectedId),
    {
        Title: txtTitle.Text
    }
)
```

---

## Troubleshooting

### Control Not Visible

**Issue:** Calendar control doesn't appear after import

**Solutions:**
- Verify solution is imported successfully
- Check that component is imported into the app
- Ensure control has proper size (width and height)
- Check if control is behind other components

### No Data Showing

**Issue:** Calendar is empty

**Solutions:**
- Verify Items property is set correctly
- Check data source has records with valid dates
- Ensure date fields are mapped correctly
- Check filter formulas for errors
- Verify delegation warnings

### Fields Not Mapping

**Issue:** Data doesn't display correctly

**Solutions:**
- Verify field mapping formulas use `ThisItem.FieldName`
- Check data types match requirements
- Ensure field names are correct (case-sensitive)
- Test with simple data first

### Events Not Triggering

**Issue:** OnChange doesn't fire

**Solutions:**
- Verify OnChange property is configured
- Check formula syntax
- Ensure eventActions object structure is correct
- Test with simple Notify() first

### Performance Issues

**Issue:** App is slow or laggy

**Solutions:**
- Limit data with Filter() on Items
- Use delegation-friendly formulas
- Consider using collections for small datasets
- Optimize business rules complexity
- Reduce number of refiners

---

## Best Practices

### Data Management

1. **Filter Data**: Always filter to reasonable date ranges
2. **Use Delegation**: Ensure formulas are delegation-friendly
3. **Optimize Queries**: Minimize the number of data calls
4. **Cache Data**: Use collections when appropriate

### Performance

1. **Limit Records**: Display only necessary date range
2. **Simplify Formulas**: Keep formulas simple and efficient
3. **Reduce Refiners**: Use only essential refiners
4. **Minimize Business Rules**: Only add necessary rules

### User Experience

1. **Responsive Design**: Test on different screen sizes
2. **Loading States**: Show loading indicators for data
3. **Error Handling**: Handle errors gracefully with If() checks
4. **User Feedback**: Use Notify() to confirm actions

### Maintenance

1. **Document Formulas**: Add comments to complex formulas
2. **Version Control**: Use solutions for version management
3. **Test Thoroughly**: Test all scenarios before publishing
4. **Monitor Usage**: Track app analytics and user feedback

---

## Next Steps

After installing the calendar control, configure it for your specific needs:

1. **[Main Configuration](../configurations/configuration.md)**: Set up calendar views and behavior
2. **[Dataset Configuration](../configurations/dataset.md)**: Map your data fields
3. **[Refiners Configuration](../configurations/refiners.md)**: Enable filtering
4. **[Refiner Values Configuration](../configurations/refinerValues.md)**: Configure colors and values
5. **[Business Rules Configuration](../configurations/bussinesRules.md)**: Set up conditional formatting and actions

---

## Support and Resources

### Getting Help

For assistance with installation:

- **Email:** support@ltaddins.com
- **Phone:** +84 946 579 539
- **Website:** [https://ltaddins.com](https://ltaddins.com)

### Related Documentation

- [Model-Driven App Installation Guide](./modeldrivenapp.md)
- [Configuration Guides](../configurations/)

### Useful Resources

- [Canvas Apps Documentation](https://learn.microsoft.com/en-us/power-apps/maker/canvas-apps/)
- [Custom Pages Documentation](https://learn.microsoft.com/en-us/power-apps/maker/model-driven-apps/design-page-for-model-app)
- [Power Fx Formula Reference](https://learn.microsoft.com/en-us/power-platform/power-fx/formula-reference)
- [PCF Controls in Canvas Apps](https://learn.microsoft.com/en-us/power-apps/developer/component-framework/component-framework-for-canvas-apps)

---

**Last Updated:** November 27, 2025  
**Version:** 1.0
