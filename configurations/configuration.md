# LTAPPS Calendar PCF Control - Configuration Guide

This guide provides detailed instructions on configuring the LTAPPS Calendar PCF Control for your Power Apps environment.

## Configuration Overview

The calendar control is configured using a JSON object that defines its behavior, appearance, and functionality. All configuration settings are optional and will fall back to default values if not specified.

## Configuration Properties

### `appType`

**Type:** `string`  
**Default:** `"driven"`  
**Allowed Values:** `"driven"`, `"canvas"`, `"custompage"`

Specifies the type of Power App where the calendar control is being used.

- `"driven"` - Use for Model-Driven Apps
- `"canvas"` - Use for Canvas Apps
- `"custompage"` - Use for Custom Pages

**Example:**
```json
"appType": "driven"
```

---

### `defaultView`

**Type:** `string`  
**Default:** `"monthly"`  
**Allowed Values:** `"quarterly"`, `"monthly"`, `"weekly"`, `"daily"`

Sets the initial calendar view when the control loads.

- `"quarterly"` - Displays a quarter view showing three months
- `"monthly"` - Displays a full month view
- `"weekly"` - Displays a week view
- `"daily"` - Displays a single day view

**Example:**
```json
"defaultView": "monthly"
```

---

### `fiscalYearSartMonth`

**Type:** `number`  
**Default:** `1`  
**Allowed Values:** `1-12` (January = 1, December = 12)

Defines the starting month of your organization's fiscal year. This affects the quarterly view display.

**Example:**
```json
"fiscalYearSartMonth": 1
```

**Note:** Common fiscal year starts:
- `1` - January (Calendar year)
- `4` - April
- `7` - July
- `10` - October

---

### `useRefiners`

**Type:** `boolean`  
**Default:** `true`

Enables or disables the refiner panel for filtering calendar events.

- `true` - Shows the refiner panel
- `false` - Hides the refiner panel

**Example:**
```json
"useRefiners": true
```

---

### `refinerExpanded`

**Type:** `boolean`  
**Default:** `true`

Controls the initial state of the refiner panel (only applicable when `useRefiners` is `true`).

- `true` - Refiner panel is expanded by default
- `false` - Refiner panel is collapsed by default

**Example:**
```json
"refinerExpanded": true
```

---

### `isMultiLevelRefiner`

**Type:** `boolean`  
**Default:** `true`

Enables multi-level refiners, allowing users to filter events based on multiple criteria simultaneously.

- `true` - Users can select multiple filter criteria
- `false` - Single-level filtering only

**Example:**
```json
"isMultiLevelRefiner": true
```

---

### `dateFormat`

**Type:** `string`  
**Default:** `"MM/DD/YYYY"`

Specifies the date format displayed throughout the calendar control.

**Common Formats:**
- `"MM/DD/YYYY"` - US format (e.g., 12/31/2025)
- `"DD/MM/YYYY"` - European format (e.g., 31/12/2025)
- `"YYYY-MM-DD"` - ISO format (e.g., 2025-12-31)
- `"DD MMM YYYY"` - With month name (e.g., 31 Dec 2025)

**Example:**
```json
"dateFormat": "MM/DD/YYYY"
```

---

### `timeFormat`

**Type:** `string`  
**Default:** `"hh:mm A"`

Specifies the time format displayed for events.

**Common Formats:**
- `"hh:mm A"` - 12-hour format with AM/PM (e.g., 02:30 PM)
- `"HH:mm"` - 24-hour format (e.g., 14:30)
- `"hh:mm:ss A"` - 12-hour with seconds (e.g., 02:30:45 PM)

**Example:**
```json
"timeFormat": "hh:mm A"
```

---

### `isShowNewEvent`

**Type:** `boolean`  
**Default:** `true`

Controls whether the "New Event" button is displayed, allowing users to create new calendar events.

- `true` - Shows the "New Event" button
- `false` - Hides the "New Event" button

**Example:**
```json
"isShowNewEvent": true
```

---

### `isOpenDataserveForm`

**Type:** `boolean`  
**Default:** `true`

Determines whether clicking on an event opens the Dataverse form for editing.

- `true` - Opens the Dataverse form when an event is clicked
- `false` - Custom behavior or no form opening (useful for read-only calendars)

**Example:**
```json
"isOpenDataserveForm": true
```

---

## Complete Configuration Example

Here's a complete configuration example with all available properties:

```json
{
    "appType": "driven",
    "defaultView": "monthly",
    "fiscalYearSartMonth": 1,
    "useRefiners": true,
    "refinerExpanded": true,
    "isMultiLevelRefiner": true,
    "dateFormat": "MM/DD/YYYY",
    "timeFormat": "hh:mm A",
    "isShowNewEvent": true,
    "isOpenDataserveForm": true
}
```

## Configuration Scenarios

### Scenario 1: Simple Read-Only Calendar

For a calendar that displays events without editing capabilities:

```json
{
    "appType": "canvas",
    "defaultView": "monthly",
    "useRefiners": false,
    "isShowNewEvent": false,
    "isOpenDataserveForm": false
}
```

### Scenario 2: Fiscal Year Calendar with Quarterly View

For organizations with a fiscal year starting in July:

```json
{
    "appType": "driven",
    "defaultView": "quarterly",
    "fiscalYearSartMonth": 7,
    "useRefiners": true,
    "refinerExpanded": true,
    "isMultiLevelRefiner": true
}
```

### Scenario 3: European Format Calendar

For European date/time formats:

```json
{
    "appType": "driven",
    "defaultView": "weekly",
    "dateFormat": "DD/MM/YYYY",
    "timeFormat": "HH:mm",
    "useRefiners": true
}
```

### Scenario 4: Minimalist Daily Planner

For a simple daily view without refiners:

```json
{
    "appType": "canvas",
    "defaultView": "daily",
    "useRefiners": false,
    "dateFormat": "DD MMM YYYY",
    "timeFormat": "hh:mm A"
}
```

## Implementation Steps

### Step 1: Prepare Your Configuration

1. Create a new JSON file or use the provided example
2. Copy the base configuration structure
3. Modify the properties according to your requirements
4. Validate the JSON syntax using a JSON validator

### Step 2: Apply Configuration to Model-Driven Apps

1. Navigate to your Model-Driven App in Power Apps
2. Select the form where the calendar control is added
3. Select the calendar control on the form
4. In the properties panel, locate the "Configuration" property
5. Paste your JSON configuration string
6. Save and publish your changes

### Step 3: Apply Configuration to Canvas Apps

1. Open your Canvas App in Power Apps Studio
2. Select the calendar control component
3. In the properties panel, locate the "Configuration" property
4. Paste your JSON configuration string
5. Save and publish your app

### Step 4: Apply Configuration to Custom Pages

1. Open your Custom Page in Power Apps
2. Select the calendar control
3. In the properties panel, locate the "Configuration" property
4. Paste your JSON configuration string
5. Save and publish your custom page

## Validation and Testing

After applying your configuration:

1. **Test Different Views**: Switch between quarterly, monthly, weekly, and daily views to ensure proper rendering
2. **Test Refiners**: If enabled, verify that filtering works correctly with your data
3. **Test Date/Time Formats**: Confirm that dates and times display in your specified format
4. **Test Event Creation**: If enabled, verify the "New Event" button works as expected
5. **Test Event Editing**: If enabled, verify that clicking events opens the appropriate form

## Troubleshooting

### Configuration Not Applied

- Ensure JSON syntax is valid (use a JSON validator)
- Check for typos in property names
- Verify the configuration string is properly formatted
- Clear browser cache and reload the app

### Refiners Not Displaying

- Verify `useRefiners` is set to `true`
- Ensure your data source has filterable fields configured
- Check that refiner fields are properly mapped

### Date/Time Format Not Working

- Ensure format strings match the expected patterns
- Test with different format strings to find the correct syntax
- Verify the format is supported by the control

## Best Practices

1. **Start Simple**: Begin with minimal configuration and add properties as needed
2. **Document Changes**: Keep a record of your configuration for future reference
3. **Test Thoroughly**: Test all configuration changes in a development environment first
4. **Use Comments**: While JSON doesn't support comments, maintain separate documentation
5. **Version Control**: Store configuration files in version control for tracking changes
6. **Backup**: Keep backup copies of working configurations before making changes


**Last Updated:** November 26, 2025  
**Version:** 1.0
