# LTAPPS Calendar PCF Control - Model-Driven App Installation Guide

This guide provides step-by-step instructions for installing and configuring the LTAPPS Calendar PCF Control in Model-Driven Apps. Follow these instructions to add the calendar control to your forms, views, or dashboards.

## Overview

The LTAPPS Calendar PCF Control is a PowerApps Component Framework (PCF) control that enables rich calendar functionality in Model-Driven Apps. It can be added to:
- **Entity Views**: Replace grid views with calendar views
- **Form Subgrids**: Show related records in calendar format within a form

**Prerequisites:**
- Power Platform environment with Dataverse
- System Administrator or System Customizer role
- Entity with appropriate date/time fields
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
   - Verify the solution contains the following components:
     - **Control**: LTAPPS Calendar PCF control
     - **Web Resources**: Supporting JavaScript and CSS files

3. **Publish All Customizations**
   - Click **Publish all customizations** to ensure the control is available

---

## Configuration Options

After importing the solution, you can add the calendar control in two ways:

### Option 1: Add to Entity View

Replace the default grid view with a calendar view.

**Use Cases:**
- Calendar view of all appointments
- Event schedule view
- Resource booking calendar

[See detailed instructions →](#adding-to-entity-view)

---

### Option 2: Add as Form Subgrid

Display related records in calendar format within a form.

**Use Cases:**
- Show customer appointments on account form
- Display project milestones on project form
- Show resource bookings on resource form

[See detailed instructions →](#adding-as-form-subgrid)

---

## Adding to Entity View

### Step 1: Create or Edit a View

1. Navigate to **Solutions** → Select your solution
2. Expand **Tables** and select your target table
3. Click on **Views**
4. Select an existing view or click **+ New view**

### Step 2: Configure View Control

1. **Open View Designer**
   - Click on the view name to open the designer

2. **Switch to Calendar Control**
   - In the view designer, click on **Components**
   - Under **Components**, Click on **Add Component** > **Get More Component**
   - Search for and select **LTAPPS Calendar**

3. **Configure Control Settings**
   - Select **LTAPPS Calendar** in the Components list
   - Configure the following:
     - `configuration`: Main calendar configuration JSON ([Configuration Guide](../configurations/configuration.md))
     - `refiners`: Refiner configuration JSON ([Refiners Guide](../configurations/refiners.md))
     - `refinerValues`: Refiner values configuration JSON ([Refiner Values Guide](../configurations/refinerValues.md))
     - `bussinesRules`: Business rules configuration JSON ([Business Rules Guide](../configurations/bussinesRules.md))
   - Map dataset fields to your entity fields ([Dataset Guide](../configurations/dataset.md))

4. **Set Display Options**
   - Check the devices where the calendar should display:
     - **Web**: For desktop/laptop browsers
     - **Phone**: For mobile devices
     - **Tablet**: For tablet devices
   - Make **LTAPPS Calendar** the default control by moving it to the top

### Step 3: Configure View Columns

Ensure your view includes all columns needed for the calendar:
- Title field
- Start date field
- End date field
- All-day event field (if used)
- Recurring field (if used)
- Recurrence pattern field (if used)
- Refiner fields (if used)

### Step 4: Save and Publish

1. Click **Save** 
2. Click **Publish**
3. Navigate to your Model-Driven App
4. Open the view to verify the calendar displays

---

## Adding as Subgrid

### Step 1: Open Parent Form

1. Navigate to the parent entity's form (e.g., Account, Project)
2. Open the form in the form designer

### Step 2: Add Subgrid Control

1. **Add Subgrid Component**
   - Click **+ Component**
   - Select **Subgrid** or **Grid**
   - Drag it to the desired location on the form

2. **Configure Subgrid**
   - **Label**: Enter a name (e.g., "Related Appointments")
   - **Table**: Select the related table (e.g., Appointments)
   - **View**: Select the view to display
   - **Related records**: Choose the relationship

3. **Add Calendar Control**
   - With the subgrid selected, go to **Components**
   - Click **+ Add component** > **Get more Components**
   - Find and Select **LTAPPS Calendar**

4. **Configure Calendar Properties**
   - With the subgrid selected, go to the **Properties** panel
   - Configure the following:
     - `configuration`: Main calendar configuration JSON ([Configuration Guide](../configurations/configuration.md))
     - `refiners`: Refiner configuration JSON ([Refiners Guide](../configurations/refiners.md))
     - `refinerValues`: Refiner values configuration JSON ([Refiner Values Guide](../configurations/refinerValues.md))
     - `bussinesRules`: Business rules configuration JSON ([Business Rules Guide](../configurations/bussinesRules.md))
   - Map dataset fields to the related entity's fields ([Dataset Guide](../configurations/dataset.md))

5. **Set Display Options**
   - Check Web, Phone, Tablet as needed
   - Make LTAPPS Calendar the default control

### Step 3: Save and Publish

1. Click **Save**
2. Click **Publish**
3. Open a parent record to verify the calendar subgrid displays correctly

---

## Event Handling

The calendar control supports event handling in Model-Driven Apps for user interactions like clicking on events or action buttons.

### For View-Based Calendars

When the calendar is displayed in an entity view, event handling occurs within the view context. Users can click on events to open records.

### For Subgrid-Based Calendars

For calendars in form subgrids, you need to set up JavaScript handlers to respond to action button clicks:

**Example: Handling Action Button Clicks**

```javascript
function onFormLoad(executionContext) {
    const formCtx = executionContext.getFormContext();

    const handlePcfMessage = (data) => {
        const payload = data?.data;
        
        // Check if the message is from the calendar control
        if (payload?.controlName == "pcfLTAPPSCalendar") {
            switch (payload?.actionName) {
                case "onNewEvent":
                    console.log("New event created:", payload);
                    Xrm.Navigation.openForm({
                        entityName: "ltcal_event",
                        openInNewWindow: false
                    });
                    break;

                case "onDateChanged":
                    console.log("Date changed to:", payload);
                    // Handle date change logic here
                    break;

                case "onOpenEvent":
                    console.log("Open event with data:", payload);
                    Xrm.Navigation.openForm({
                        entityName: "ltcal_event",
                        entityId: payload?.data,
                        openInNewWindow: false
                    });
                    break;

                case "onAction1":
                    console.log("Action 1 triggered with data:", payload);
                    // Custom logic for Action Button 1
                    Xrm.Navigation.openForm({
                        entityName: "ltcal_event",
                        entityId: payload?.data,
                        openInNewWindow: false
                    });
                    break;

                case "onAction2":
                    console.log("Action 2 triggered with data:", payload);
                    // Custom logic for Action Button 2
                    break;

                case "onAction3":
                    console.log("Action 3 triggered with data:", payload);
                    // Custom logic for Action Button 3
                    break;

                case "onAction4":
                    console.log("Action 4 triggered with data:", payload);
                    // Custom logic for Action Button 4
                    break;

                case "onAction5":
                    console.log("Action 5 triggered with data:", payload);
                    // Custom logic for Action Button 5
                    break;

                case "onAction6":
                    console.log("Action 6 triggered with data:", payload);
                    // Custom logic for Action Button 6
                    break;

                case "onAction7":
                    console.log("Action 7 triggered with data:", payload);
                    // Custom logic for Action Button 7
                    break;

                case "onAction8":
                    console.log("Action 8 triggered with data:", payload);
                    // Custom logic for Action Button 8
                    break;

                case "onAction9":
                    console.log("Action 9 triggered with data:", payload);
                    // Custom logic for Action Button 9
                    break;
            }
        }
    };

    // Register the message listener
    const host = window.top;
    host.addEventListener("message", handlePcfMessage, false);

    // Clean up the listener when the form is saved
    formCtx.data.entity.addOnSave(() => {
        host.removeEventListener("message", handlePcfMessage);
    });
}
```

See the [Business Rules Guide](../configurations/bussinesRules.md) for more details on event handling.

---

## Troubleshooting

### Calendar Not Displaying

**Issue:** Calendar control doesn't appear on the form/view

**Solutions:**
- Verify the solution is imported and published
- Check that all required fields are mapped
- Ensure the control is enabled for the current device (Web/Phone/Tablet)
- Verify user has permissions to the entity and fields
- Clear browser cache and refresh

### No Events Showing

**Issue:** Calendar displays but no events appear

**Solutions:**
- Verify dataset field mappings are correct
- Check that records exist with valid date ranges
- Ensure view includes all required columns
- Verify field-level security allows reading date fields
- Check filtering on the view or subgrid

### Configuration Not Applied

**Issue:** Calendar displays with default settings, ignoring configuration

**Solutions:**
- Verify configuration JSON is valid (use a JSON validator)
- Check property names match exactly (case-sensitive)
- Ensure configuration is added to the correct property fields
- Republish customizations after making changes

### Events Not Clickable

**Issue:** Cannot click on events or action buttons don't respond

**Solutions:**
- For subgrids: Verify JavaScript event handler is registered
- Check browser console for JavaScript errors
- Ensure business rules are configured correctly
- Verify the control is not in read-only mode

---

## Best Practices

### Performance

1. **Limit Date Range**: Filter views to reasonable date ranges (e.g., current month ± 3 months)
2. **Index Fields**: Add indexes to start date and frequently filtered fields
3. **Optimize Views**: Only include necessary columns in the view
4. **Use Pagination**: Enable pagination for large datasets

### Security

1. **Field-Level Security**: Apply appropriate field-level security
2. **Record Permissions**: Ensure users have read access to event records
3. **Business Rules**: Use business rules to control visibility of sensitive data

### User Experience

1. **Consistent Naming**: Use clear, consistent names for forms and views
2. **Default Views**: Set calendar views as default where appropriate
3. **Mobile Support**: Test calendar on mobile devices
4. **Documentation**: Provide user documentation for calendar features

### Maintenance

1. **Version Control**: Track solution versions and changes
2. **Test Environment**: Test changes in dev/test before production
3. **Backup**: Regularly backup solutions and configurations
4. **Monitor**: Monitor calendar performance and user feedback

---

## Next Steps

After installing the calendar control, configure it for your specific needs:

1. **[Main Configuration](../configurations/configuration.md)**: Set up calendar views, display options, and behavior
2. **[Dataset Configuration](../configurations/dataset.md)**: Map your entity fields to calendar properties
3. **[Refiners Configuration](../configurations/refiners.md)**: Enable filtering by categories or resources
4. **[Refiner Values Configuration](../configurations/refinerValues.md)**: Configure colors and values for refiners
5. **[Business Rules Configuration](../configurations/bussinesRules.md)**: Set up conditional formatting and action buttons

---

## Support and Resources

### Getting Help

For assistance with installation:

- **Email:** support@ltaddins.com
- **Phone:** +84 946 579 539
- **Website:** [https://ltaddins.com](https://ltaddins.com)

### Related Documentation

- [Canvas App Installation Guide](./canvasapp.md)
- [Custom Pages Installation Guide](./custompages.md)
- [Configuration Guides](../configurations/)

### Useful Resources

- [Power Apps Model-Driven Apps](https://learn.microsoft.com/en-us/power-apps/maker/model-driven-apps/)
- [PCF Controls Documentation](https://learn.microsoft.com/en-us/power-apps/developer/component-framework/)
- [Dataverse Tables and Fields](https://learn.microsoft.com/en-us/power-apps/maker/data-platform/)

---

**Last Updated:** November 27, 2025  
**Version:** 1.0
