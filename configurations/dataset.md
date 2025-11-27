# LTAPPS Calendar PCF Control - Dataset Configuration Guide

This guide provides detailed instructions on configuring the dataset (data source) for the LTAPPS Calendar PCF Control. The dataset defines which fields from your Dataverse entity are mapped to the calendar's event properties.

## Overview

The calendar control uses a dataset to bind event data from your Dataverse entity to the calendar display. Proper field mapping ensures that events appear correctly with all necessary information including titles, dates, recurrence patterns, and refiner associations.

**Dataset Name:** `calendarDataSet`

---

## Required vs Optional Fields

The dataset configuration includes both required and optional fields:

- **Required Fields**: Must be mapped for the calendar to function
- **Optional Fields**: Enhance functionality but are not mandatory

---

## Dataset Properties

### 1. Title (`title`)

**Display Name:** Event Title  
**Type:** `SingleLine.Text`  
**Required:** Yes  
**Usage:** Bound

The title or name of the calendar event that will be displayed on the calendar.

**Field Requirements:**
- Must be a single line of text field
- Cannot be empty for proper event display
- Recommended maximum length: 100 characters for optimal display

**Example Dataverse Fields:**
- `ltcal_title`
- `subject`
- `name`
- `cr5b3_eventname`

**Mapping Example:**
```
Field Name: ltcal_title
Field Type: Single Line of Text
```

---

### 2. Start Date (`startdate`)

**Display Name:** Start Date  
**Type:** `DateAndTime.DateAndTime`  
**Required:** Yes  
**Usage:** Bound

The start date and time of the calendar event.

**Field Requirements:**
- Must be a date and time field (not date-only)
- Includes both date and time components
- Used to determine event positioning on the calendar
- Must be less than or equal to end date

**Example Dataverse Fields:**
- `ltcal_startdate`
- `scheduledstart`
- `actualstart`
- `cr5b3_startdatetime`

**Mapping Example:**
```
Field Name: ltcal_startdate
Field Type: Date and Time
```

**Important Notes:**
- Time zone handling follows Dataverse settings
- For all-day events, typically set to midnight
- Required for all calendar views (monthly, weekly, daily)

---

### 3. End Date (`enddate`)

**Display Name:** End Date  
**Type:** `DateAndTime.DateAndTime`  
**Required:** Yes  
**Usage:** Bound

The end date and time of the calendar event.

**Field Requirements:**
- Must be a date and time field (not date-only)
- Includes both date and time components
- Must be greater than or equal to start date
- Determines the event duration on the calendar

**Example Dataverse Fields:**
- `ltcal_enddate`
- `scheduledend`
- `actualend`
- `cr5b3_enddatetime`

**Mapping Example:**
```
Field Name: ltcal_enddate
Field Type: Date and Time
```

**Important Notes:**
- For all-day events, typically set to end of day (11:59 PM) or start of next day
- Multi-day events span across calendar dates
- Affects event blocking and overlap detection

---

### 4. Is All Day Event (`isalldayevent`)

**Display Name:** Is All Day Event  
**Type:** `TwoOptions`  
**Required:** No  
**Usage:** Bound

Indicates whether the event is an all-day event.

**Field Requirements:**
- Must be a Yes/No (TwoOptions/Boolean) field
- `true`/`Yes` = All-day event
- `false`/`No` = Specific time event

**Example Dataverse Fields:**
- `ltcal_isalldayevent`
- `isalldayevent`
- `cr5b3_fullday`

**Mapping Example:**
```
Field Name: ltcal_isalldayevent
Field Type: Yes/No
Default Value: No
```

**Behavior:**
- **When True**: Event displays without specific times, shows as full-day block
- **When False**: Event shows with start and end times
- **When Not Mapped**: Defaults to false, shows with times

---

### 5. Is Recurring (`isrecurring`)

**Display Name:** Is Recurring  
**Type:** `TwoOptions`  
**Required:** No  
**Usage:** Bound

Indicates whether the event follows a recurring pattern.

**Field Requirements:**
- Must be a Yes/No (TwoOptions/Boolean) field
- `true`/`Yes` = Recurring event
- `false`/`No` = Single occurrence event

**Example Dataverse Fields:**
- `ltcal_isrecurring`
- `isrecurring`
- `cr5b3_repeating`

**Mapping Example:**
```
Field Name: ltcal_isrecurring
Field Type: Yes/No
Default Value: No
```

**Behavior:**
- **When True**: Calendar looks for recurrence pattern in the `recurrence` field
- **When False**: Event appears as single occurrence
- **When Not Mapped**: All events treated as non-recurring

**Important Note:** Must be used together with the `recurrence` field for recurring events to display properly.

---

### 6. Recurrence Pattern (`recurrence`)

**Display Name:** Recurrence Pattern  
**Type:** `Multiple`  
**Required:** No  
**Usage:** Bound

The recurrence pattern defining how the event repeats using Microsoft Graph recurrence format.

**Field Requirements:**
- Multiple lines of text field
- Stores recurrence rule in JSON string format
- Must follow Microsoft Graph recurrence pattern format

**Example Dataverse Fields:**
- `ltcal_recurrence`
- `recurrencepattern`
- `cr5b3_recurrencerule`

**Mapping Example:**
```
Field Name: ltcal_recurrence
Field Type: Multiple Lines of Text
Format: Text
```

**Recurrence Format:**

The recurrence pattern follows the [Microsoft Graph recurrence format](https://learn.microsoft.com/en-us/graph/outlook-schedule-recurring-events), which consists of two parts:
1. **Pattern**: Defines how often the event repeats (daily, weekly, monthly, yearly)
2. **Range**: Defines for how long the pattern repeats (numbered, endDate, noEnd)

**Basic Structure:**

```json
{
  "pattern": {
    "type": "daily",
    "interval": 1
  },
  "range": {
    "type": "endDate",
    "startDate": "2025-01-01",
    "endDate": "2025-12-31"
  }
}
```

---

## Recurrence Patterns

### Daily Pattern

Causes an event to repeat based on a number of days between each occurrence.

**Properties:**
- `type`: Must be `"daily"`
- `interval`: Required. Number of days between each occurrence (1-999)

**Examples:**

```json
// Every day
{
  "pattern": {
    "type": "daily",
    "interval": 1
  },
  "range": {
    "type": "numbered",
    "startDate": "2025-01-01",
    "numberOfOccurrences": 10
  }
}
```

```json
// Every 3 days
{
  "pattern": {
    "type": "daily",
    "interval": 3
  },
  "range": {
    "type": "noEnd",
    "startDate": "2025-01-01"
  }
}
```

---

### Weekly Pattern

Causes an event to repeat on the same day or days of the week.

**Properties:**
- `type`: Must be `"weekly"`
- `interval`: Required. Number of weeks between each set of occurrences (1-99)
- `daysOfWeek`: Required. Array of days when the event occurs
  - Possible values: `"sunday"`, `"monday"`, `"tuesday"`, `"wednesday"`, `"thursday"`, `"friday"`, `"saturday"`
- `firstDayOfWeek`: Optional. First day of the week. Default: `"sunday"`

**Examples:**

```json
// Every Thursday
{
  "pattern": {
    "type": "weekly",
    "interval": 1,
    "daysOfWeek": ["thursday"]
  },
  "range": {
    "type": "noEnd",
    "startDate": "2025-01-01"
  }
}
```

```json
// Every Monday, Wednesday, Friday
{
  "pattern": {
    "type": "weekly",
    "interval": 1,
    "daysOfWeek": ["monday", "wednesday", "friday"]
  },
  "range": {
    "type": "endDate",
    "startDate": "2025-01-01",
    "endDate": "2025-12-31"
  }
}
```

```json
// Every other Monday and Tuesday
{
  "pattern": {
    "type": "weekly",
    "interval": 2,
    "daysOfWeek": ["monday", "tuesday"]
  },
  "range": {
    "type": "numbered",
    "startDate": "2025-01-01",
    "numberOfOccurrences": 20
  }
}
```

---

### Absolute Monthly Pattern

Causes an event to repeat on the same day of the month (e.g., the 15th).

**Properties:**
- `type`: Must be `"absoluteMonthly"`
- `interval`: Required. Number of months between each occurrence (1-99)
- `dayOfMonth`: Required. Day of the month the event occurs (1-31)

**Examples:**

```json
// 15th of every month
{
  "pattern": {
    "type": "absoluteMonthly",
    "interval": 1,
    "dayOfMonth": 15
  },
  "range": {
    "type": "noEnd",
    "startDate": "2025-01-15"
  }
}
```

```json
// Quarterly on the 7th (every 3 months)
{
  "pattern": {
    "type": "absoluteMonthly",
    "interval": 3,
    "dayOfMonth": 7
  },
  "range": {
    "type": "endDate",
    "startDate": "2025-01-07",
    "endDate": "2025-12-31"
  }
}
```

---

### Relative Monthly Pattern

Causes an event to repeat on the same day of the week in the same relative position in the month (e.g., "every second Wednesday").

**Properties:**
- `type`: Must be `"relativeMonthly"`
- `interval`: Required. Number of months between each occurrence (1-99)
- `daysOfWeek`: Required. Array of days when the event can occur (only first matching day is used)
  - Possible values: `"sunday"`, `"monday"`, `"tuesday"`, `"wednesday"`, `"thursday"`, `"friday"`, `"saturday"`
- `index`: Optional. Which instance of the day (`"first"`, `"second"`, `"third"`, `"fourth"`, `"last"`). Default: `"first"`

**Examples:**

```json
// Second Wednesday of every month
{
  "pattern": {
    "type": "relativeMonthly",
    "interval": 1,
    "daysOfWeek": ["wednesday"],
    "index": "second"
  },
  "range": {
    "type": "noEnd",
    "startDate": "2025-01-08"
  }
}
```

```json
// First Thursday or Friday of every month (first match is used)
{
  "pattern": {
    "type": "relativeMonthly",
    "interval": 1,
    "daysOfWeek": ["thursday", "friday"],
    "index": "first"
  },
  "range": {
    "type": "numbered",
    "startDate": "2025-01-02",
    "numberOfOccurrences": 12
  }
}
```

```json
// Last Friday of every month
{
  "pattern": {
    "type": "relativeMonthly",
    "interval": 1,
    "daysOfWeek": ["friday"],
    "index": "last"
  },
  "range": {
    "type": "noEnd",
    "startDate": "2025-01-31"
  }
}
```

---

### Absolute Yearly Pattern

Causes an event to repeat on the same month and day each year (e.g., April 15).

**Properties:**
- `type`: Must be `"absoluteYearly"`
- `interval`: Required. Number of years between each occurrence (1-99)
- `dayOfMonth`: Required. Day of the month the event occurs (1-31)
- `month`: Required. Month the event occurs (1-12)

**Examples:**

```json
// April 15 every year
{
  "pattern": {
    "type": "absoluteYearly",
    "interval": 1,
    "dayOfMonth": 15,
    "month": 4
  },
  "range": {
    "type": "noEnd",
    "startDate": "2025-04-15"
  }
}
```

```json
// December 25 every year for 10 occurrences
{
  "pattern": {
    "type": "absoluteYearly",
    "interval": 1,
    "dayOfMonth": 25,
    "month": 12
  },
  "range": {
    "type": "numbered",
    "startDate": "2025-12-25",
    "numberOfOccurrences": 10
  }
}
```

---

### Relative Yearly Pattern

Causes an event to repeat on the same day of the week in the same relative position in a specific month each year (e.g., "last Wednesday of November").

**Properties:**
- `type`: Must be `"relativeYearly"`
- `interval`: Required. Number of years between each occurrence (1-99)
- `daysOfWeek`: Required. Array of days when the event can occur (only first matching day is used)
  - Possible values: `"sunday"`, `"monday"`, `"tuesday"`, `"wednesday"`, `"thursday"`, `"friday"`, `"saturday"`
- `index`: Optional. Which instance of the day (`"first"`, `"second"`, `"third"`, `"fourth"`, `"last"`). Default: `"first"`
- `month`: Required. Month the event occurs (1-12)

**Examples:**

```json
// Last Wednesday of November every year (US Thanksgiving approximation)
{
  "pattern": {
    "type": "relativeYearly",
    "interval": 1,
    "daysOfWeek": ["wednesday"],
    "index": "last",
    "month": 11
  },
  "range": {
    "type": "noEnd",
    "startDate": "2025-11-26"
  }
}
```

```json
// First Monday of September every year (Labor Day)
{
  "pattern": {
    "type": "relativeYearly",
    "interval": 1,
    "daysOfWeek": ["monday"],
    "index": "first",
    "month": 9
  },
  "range": {
    "type": "endDate",
    "startDate": "2025-09-01",
    "endDate": "2030-12-31"
  }
}
```

---

## Recurrence Ranges

The range defines for how long the pattern repeats.

### Numbered Range

Causes an event to occur a fixed number of times.

**Properties:**
- `type`: Must be `"numbered"`
- `startDate`: Required. Date to start applying the pattern (YYYY-MM-DD)
- `numberOfOccurrences`: Required. Total number of occurrences (positive integer)
- `recurrenceTimeZone`: Optional. Time zone for the startDate

**Example:**

```json
{
  "pattern": {
    "type": "weekly",
    "interval": 1,
    "daysOfWeek": ["monday", "wednesday", "friday"]
  },
  "range": {
    "type": "numbered",
    "startDate": "2025-01-01",
    "numberOfOccurrences": 20
  }
}
```

---

### End Date Range

Causes an event to occur on all days that fit the pattern between a start date and an end date.

**Properties:**
- `type`: Must be `"endDate"`
- `startDate`: Required. Date to start applying the pattern (YYYY-MM-DD)
- `endDate`: Required. Date to stop applying the pattern (YYYY-MM-DD)
- `recurrenceTimeZone`: Optional. Time zone for the startDate and endDate

**Example:**

```json
{
  "pattern": {
    "type": "daily",
    "interval": 1
  },
  "range": {
    "type": "endDate",
    "startDate": "2025-07-01",
    "endDate": "2025-07-31"
  }
}
```

---

### No End Range

Causes an event to occur on all days that fit the pattern after a start date indefinitely.

**Properties:**
- `type`: Must be `"noEnd"`
- `startDate`: Required. Date to start applying the pattern (YYYY-MM-DD)
- `recurrenceTimeZone`: Optional. Time zone for the startDate

**Example:**

```json
{
  "pattern": {
    "type": "weekly",
    "interval": 1,
    "daysOfWeek": ["tuesday", "thursday"]
  },
  "range": {
    "type": "noEnd",
    "startDate": "2025-05-15"
  }
}
```

---

## Complete Examples

### Example 1: Team Meeting

Every Monday from 1:00 PM to 1:30 PM, starting September 4, 2025, until the end of the year:

```json
{
  "pattern": {
    "type": "weekly",
    "interval": 1,
    "daysOfWeek": ["monday"]
  },
  "range": {
    "type": "endDate",
    "startDate": "2025-09-04",
    "endDate": "2025-12-31"
  }
}
```

### Example 2: Monthly Review

First Thursday of every other month, starting August 29, 2025, no end date:

```json
{
  "pattern": {
    "type": "relativeMonthly",
    "interval": 2,
    "daysOfWeek": ["thursday"],
    "index": "first"
  },
  "range": {
    "type": "noEnd",
    "startDate": "2025-08-29"
  }
}
```

### Example 3: Daily Standup

Every weekday (Monday-Friday) for 30 occurrences:

```json
{
  "pattern": {
    "type": "weekly",
    "interval": 1,
    "daysOfWeek": ["monday", "tuesday", "wednesday", "thursday", "friday"]
  },
  "range": {
    "type": "numbered",
    "startDate": "2025-01-06",
    "numberOfOccurrences": 30
  }
}
```

### Example 4: Quarterly Business Review

15th of every 3rd month (quarterly):

```json
{
  "pattern": {
    "type": "absoluteMonthly",
    "interval": 3,
    "dayOfMonth": 15
  },
  "range": {
    "type": "endDate",
    "startDate": "2025-01-15",
    "endDate": "2026-12-31"
  }
}
```

---

## Storage Format

Store the recurrence as a JSON string in your Dataverse field. The calendar control will parse this JSON to generate recurring event instances.

**Example Field Value:**

```json
{"pattern":{"type":"weekly","interval":1,"daysOfWeek":["monday","wednesday","friday"]},"range":{"type":"numbered","startDate":"2025-01-01","numberOfOccurrences":20}}
```

**Formatted for readability:**

```json
{
  "pattern": {
    "type": "weekly",
    "interval": 1,
    "daysOfWeek": ["monday", "wednesday", "friday"]
  },
  "range": {
    "type": "numbered",
    "startDate": "2025-01-01",
    "numberOfOccurrences": 20
  }
}
```

---

## Behavior

- Calendar automatically generates recurring instances based on the pattern
- Only the master event record exists in Dataverse
- Each occurrence is calculated and displayed dynamically
- The JSON must be valid and well-formed
- All dates use ISO 8601 format (YYYY-MM-DD)
- Day names must be lowercase
- Pattern types and range types are case-sensitive

---

## Validation Rules

1. **Pattern Type**: Must be one of: `daily`, `weekly`, `absoluteMonthly`, `relativeMonthly`, `absoluteYearly`, `relativeYearly`
2. **Range Type**: Must be one of: `numbered`, `endDate`, `noEnd`
3. **Interval**: Must be a positive integer within allowed range
4. **Days of Week**: Must be lowercase: `sunday`, `monday`, `tuesday`, `wednesday`, `thursday`, `friday`, `saturday`
5. **Index**: Must be one of: `first`, `second`, `third`, `fourth`, `last`
6. **Dates**: Must be in YYYY-MM-DD format
7. **Start Date**: Must align with the pattern (e.g., if pattern is "every Monday", startDate should be a Monday or the first Monday after startDate will be used)

---

### 7. Refiner (`refiner`)

**Display Name:** Refiner  
**Type:** `Lookup.Simple`  
**Required:** No  
**Usage:** Bound

The refiner lookup field that associates the event with a refiner category.

**Field Requirements:**
- Must be a Lookup field
- Should reference your refiner entity
- Used for filtering and categorization

**Example Dataverse Fields:**
- `ltcal_refiner`
- `cr5b3_category`
- `resourcetype`

**Mapping Example:**
```
Field Name: ltcal_refiner
Field Type: Lookup
Target Entity: ltcal_refiner
```

**Behavior:**
- Links event to a refiner for filtering purposes
- Enables refiner panel filtering
- Works with refiner configuration (see refiners.md)
- If not mapped, refiner filtering is disabled

**Important Note:**
> **At any given time, only one field should be set: either `refiner` OR `refinervalueid`, not both.** The calendar control uses whichever field has a value. If both fields are populated, the behavior may be unpredictable.

**Use Cases:**
- Resource booking (meeting rooms, vehicles, equipment)
- Department categorization
- Event types or categories
- Location-based filtering

---

### 8. Refiner Value ID (`refinervalueid`)

**Display Name:** Refiner Value ID  
**Type:** `SingleLine.Text`  
**Required:** No  
**Usage:** Bound

The ID of the specific refiner value associated with the event.

**Field Requirements:**
- Single line of text field
- Stores the GUID or ID of the refiner value
- Used for more granular filtering

**Example Dataverse Fields:**
- `ltcal_refinervalueid`
- `cr5b3_categoryid`
- `resourceid`

**Mapping Example:**
```
Field Name: ltcal_refinervalueid
Field Type: Single Line of Text
```

**Behavior:**
- Provides specific refiner value identification
- Enables color coding based on refiner values
- Works with refiner values configuration (see refinerValues.md)
- Allows multiple levels of refinement

**Important Note:**
> **At any given time, only one field should be set: either `refiner` OR `refinervalueid`, not both.** The calendar control uses whichever field has a value. If both fields are populated, the behavior may be unpredictable.

**Relationship with Refiner:**
- **Refiner**: Category level (e.g., "Meeting Room")
- **Refiner Value ID**: Specific item (e.g., "Meeting Room A")

**Use Cases:**
- Specific room assignments
- Individual resource tracking
- Detailed categorization
- Custom color schemes per value

---

## Configuration Steps

### Step 1: Prepare Your Dataverse Entity

Ensure your Dataverse entity has the necessary fields:

**Required Fields:**
1. Title field (Single Line of Text)
2. Start date field (Date and Time)
3. End date field (Date and Time)

**Optional Fields (Recommended):**
4. Is all day event (Yes/No)
5. Is recurring (Yes/No)
6. Recurrence pattern (Multiple Lines of Text)
7. Refiner lookup (Lookup to refiner entity)
8. Refiner value ID (Single Line of Text)

### Step 2: Configure the Calendar Control

#### For Model-Driven Apps:

1. **Open Form Designer**
   - Navigate to your Model-Driven App
   - Open the form where you want to add the calendar
   - Or open the view configuration if adding to a view

2. **Add the Calendar Control**
   - Add a subgrid or section
   - Select "Show chart only" or appropriate display mode
   - Click "Controls" tab
   - Add "LTAPPS Calendar" control

3. **Map Dataset Fields**
   - Select the calendar control
   - In the properties panel, find the dataset properties
   - Map each property to your entity fields:

   | Property | Your Entity Field |
   |----------|------------------|
   | Title | ltcal_title |
   | Start Date | ltcal_startdate |
   | End Date | ltcal_enddate |
   | Is All Day Event | ltcal_isalldayevent |
   | Is Recurring | ltcal_isrecurring |
   | Recurrence Pattern | ltcal_recurrence |
   | Refiner | ltcal_refiner |
   | Refiner Value ID | ltcal_refinervalueid |

4. **Configure Display Options**
   - Set the control to display on Web, Phone, or Tablet
   - Configure the default view

5. **Save and Publish**
   - Save your form/view
   - Publish all customizations

#### For Canvas Apps:

1. **Add the Calendar Control**
   - Open your Canvas App
   - Insert → Custom → Import component (if not already imported)
   - Add LTAPPS Calendar to your screen

2. **Connect Data Source**
   - Select the calendar control
   - Set the `Items` property to your data source

3. **Map Fields in Properties Panel**
   - In the properties panel, you'll see dataset field mappings
   - Map each field to your collection columns:

   ```javascript
   // Example Items property
    Filter(Events, 'Events (Views)'.CalendarView)
   ```

4. **Field Mapping Example**

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

#### For Custom Pages:

Similar to Model-Driven Apps, configure the control within the custom page designer and map fields accordingly.

---

## Field Mapping Examples

### Example 1: Basic Event Calendar

Minimum configuration for a simple event calendar:

| Dataset Property | Entity Field | Field Type |
|-----------------|--------------|------------|
| title | ltcal_title | Single Line of Text |
| startdate | ltcal_startdate | Date and Time |
| enddate | ltcal_enddate | Date and Time |

### Example 2: Full-Featured Calendar

Complete configuration with all features:

| Dataset Property | Entity Field | Field Type |
|-----------------|--------------|------------|
| title | ltcal_eventname | Single Line of Text |
| startdate | ltcal_startdatetime | Date and Time |
| enddate | ltcal_enddatetime | Date and Time |
| isalldayevent | ltcal_isallday | Yes/No |
| isrecurring | ltcal_repeating | Yes/No |
| recurrence | ltcal_recurrencepattern | Multiple Lines of Text |
| refiner | ltcal_resourcetype | Lookup |
| refinervalueid | ltcal_resourceid | Single Line of Text |

### Example 3: Resource Booking Calendar

Configuration for resource management:

| Dataset Property | Entity Field | Field Type |
|-----------------|--------------|------------|
| title | booking_description | Single Line of Text |
| startdate | booking_starttime | Date and Time |
| enddate | booking_endtime | Date and Time |
| isalldayevent | booking_fullday | Yes/No |
| refiner | booking_resourcecategory | Lookup |
| refinervalueid | booking_resource | Single Line of Text |

### Example 4: Team Schedule Calendar

Configuration for team scheduling:

| Dataset Property | Entity Field | Field Type |
|-----------------|--------------|------------|
| title | schedule_activity | Single Line of Text |
| startdate | schedule_start | Date and Time |
| enddate | schedule_end | Date and Time |
| isalldayevent | schedule_allday | Yes/No |
| isrecurring | schedule_recurring | Yes/No |
| recurrence | schedule_pattern | Multiple Lines of Text |
| refiner | schedule_team | Lookup |

---

## Validation and Testing

### Step 1: Verify Field Mappings

1. Open the calendar control configuration
2. Verify each mapped field exists in your entity
3. Check field types match the required types
4. Ensure required fields are mapped

### Step 2: Test Basic Display

1. Create a test event with:
   - Title: "Test Event"
   - Start Date: Tomorrow at 9:00 AM
   - End Date: Tomorrow at 10:00 AM
2. Open the calendar and verify the event displays
3. Check that the title and times are correct

### Step 3: Test All-Day Events

1. Create a test all-day event
2. Set `isalldayevent` to true
3. Verify it displays as a full-day block without times

### Step 4: Test Recurring Events

1. Create a recurring event
2. Set `isrecurring` to true
3. Set a recurrence pattern (e.g., `FREQ=WEEKLY;BYDAY=MO,WE,FR`)
4. Verify multiple occurrences appear on the calendar

### Step 5: Test Refiner Filtering

1. Create events with different refiner values
2. Use the refiner panel to filter
3. Verify only events with selected refiners appear
4. Check that colors display correctly per refiner value

---

## Troubleshooting

### Events Not Displaying

**Issue:** Calendar is empty or events don't appear

**Solutions:**
- Verify the dataset is connected to the correct entity
- Check that required fields (title, startdate, enddate) are mapped
- Ensure events exist within the calendar's date range
- Verify field names match exactly (case-sensitive)
- Check that the entity has proper permissions

### Incorrect Event Times

**Issue:** Events show wrong times or dates

**Solutions:**
- Verify start and end date fields are mapped to Date and Time fields (not Date Only)
- Check time zone settings in Dataverse
- Ensure date values in records are correct
- Verify browser time zone matches user settings

### All-Day Events Not Working

**Issue:** All-day events show with times or don't display correctly

**Solutions:**
- Ensure `isalldayevent` field is mapped
- Verify it's a Yes/No (TwoOptions) field
- Check that the field value is set to true/Yes
- Test by creating a new all-day event

### Recurring Events Not Appearing

**Issue:** Recurring events only show once or don't repeat

**Solutions:**
- Verify both `isrecurring` and `recurrence` fields are mapped
- Ensure `isrecurring` is set to true
- Check that recurrence pattern format is valid
- Validate the RRULE syntax
- Test with a simple pattern first (e.g., `FREQ=DAILY;COUNT=5`)

### Refiner Filtering Not Working

**Issue:** Refiner panel doesn't filter events

**Solutions:**
- Verify `refiner` or `refinervalueid` field is mapped
- Check that refiner configuration is set up (see refiners.md)
- Ensure events have refiner values assigned
- Verify lookup relationships are established
- Check refiner entity has active records

### Wrong Event Colors

**Issue:** Events display with incorrect colors

**Solutions:**
- Verify `refinervalueid` is mapped correctly
- Check refiner values configuration (see refinerValues.md)
- Ensure color codes are valid
- Verify refiner value IDs match between event and refiner value entity

---

## Best Practices

### Field Naming

1. **Use Consistent Prefixes**: Use a consistent prefix for all calendar-related fields (e.g., `ltcal_`, `event_`, `calendar_`)
2. **Descriptive Names**: Use clear, descriptive field names
3. **Avoid Special Characters**: Stick to letters, numbers, and underscores

### Data Quality

1. **Validate Dates**: Ensure end date is always after start date
2. **Required Fields**: Make title, start date, and end date required in Dataverse
3. **Default Values**: Set sensible defaults for optional fields
4. **Field Length**: Limit title length to prevent display issues

### Performance

1. **Index Key Fields**: Add indexes to start date and refiner fields for better query performance
2. **Limit Date Range**: Filter data to reasonable date ranges (e.g., ±1 year)
3. **Optimize Views**: Use filtered views rather than loading all records
4. **Pagination**: Enable pagination for large datasets

### Maintenance

1. **Document Mappings**: Keep a record of field mappings for reference
2. **Version Control**: Track changes to field configurations
3. **Test After Changes**: Always test calendar after modifying field mappings
4. **Backup Data**: Backup your data before making structural changes

---

## Integration with Other Configurations

The dataset configuration works together with:

1. **Main Configuration** (configuration.md)
   - View settings
   - Date/time formats
   - General behavior

2. **Refiners Configuration** (refiners.md)
   - Requires `refiner` field mapped
   - Defines refiner categories

3. **Refiner Values Configuration** (refinerValues.md)
   - Requires `refinervalueid` field mapped
   - Defines colors and specific values

4. **Business Rules Configuration** (bussinesRules.md)
   - Uses mapped fields for conditional logic
   - Displays field values in callouts

---

## Manifest Reference

The complete dataset manifest structure:

```xml
<data-set name="calendarDataSet" display-name-key="Calendar Events Dataset">
  <property-set name="title" display-name-key="Event Title"
    description-key="Title of the calendar event" of-type="SingleLine.Text" 
    usage="bound" required="true" />
  <property-set name="startdate" display-name-key="Start Date"
    description-key="Start date and time of the event" 
    of-type="DateAndTime.DateAndTime" usage="bound" required="true" />
  <property-set name="enddate" display-name-key="End Date"
    description-key="End date and time of the event" 
    of-type="DateAndTime.DateAndTime" usage="bound" required="true" />
  <property-set name="isalldayevent" display-name-key="Is All Day Event"
    description-key="Indicates if the event is an all-day event" 
    of-type="TwoOptions" usage="bound" required="false" />
  <property-set name="isrecurring" display-name-key="Is Recurring"
    description-key="Indicates if the event is recurring" 
    of-type="TwoOptions" usage="bound" required="false" />
  <property-set name="recurrence" display-name-key="Recurrence Pattern"
    description-key="The recurrence pattern of the event" 
    of-type="Multiple" usage="bound" required="false" />
  <property-set name="refiner" display-name-key="Refiner"
    description-key="The refiner value associated with the event"
    of-type="Lookup.Simple" usage="bound" required="false" />
  <property-set name="refinervalueid" display-name-key="Refiner Value ID"
    description-key="The ID of the refiner value associated with the event"
    of-type="SingleLine.Text" usage="bound" required="false" />
</data-set>
```

---

## Support and Resources

### Getting Help

For assistance with dataset configuration:

- **Email:** support@ltaddins.com
- **Phone:** +84 946 579 539
- **Website:** [https://ltaddins.com](https://ltaddins.com)

### Related Documentation

- [Main Configuration Guide](./configuration.md)
- [Refiners Configuration Guide](./refiners.md)
- [Refiner Values Configuration Guide](./refinerValues.md)
- [Business Rules Configuration Guide](./bussinesRules.md)

### Useful Resources

- [Dataverse Field Types](https://learn.microsoft.com/en-us/power-apps/maker/data-platform/types-of-fields)
- [Microsoft Graph Recurring Events](https://learn.microsoft.com/en-us/graph/outlook-schedule-recurring-events)
- [Power Apps PCF Documentation](https://learn.microsoft.com/en-us/power-apps/developer/component-framework/)

---

**Last Updated:** November 27, 2025  
**Version:** 1.0
