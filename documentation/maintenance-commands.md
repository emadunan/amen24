# Maintenance Commands

## PostgreSQL Backup & Restore

### Full Database Backup
``` bash
pg_dump -U postgres -d amen24test -F c -f "/home/emad/db_backups/test_backup_$(date +%Y%m%d_%H%M%S).dump"
```

### Backup Specific Tables (NOT TESTED)
```
pg_dump -t public.user \
        -t public.profile \
        -t public.favorite \
        -t public.bookmark \
        -t public.verse_group \
        -t public.verse_group_verses \
        -f user_data_backup.sql \
        -d amen24test
```

### Extract a Single Table’s Data from Full Backup
``` bash
pg_restore -U postgres -t bookmark --data-only -f bookmark_data.sql amen24test_backup_2025-05-05_06-48-51.sql
```

### Edit the SQL file
``` bash
sed 's/\bbookmark\b/progress/g' bookmark_data.sql > progress_data.sql
```

### Import into database
``` bash
psql -U postgres -d amen24test -f progress_data.sql
```

## Alter table change column datatype
Just add new attribute without delete the old
Then Update the value of the first from the latter

``` sql
UPDATE profile p SET roles = ARRAY[privilege]::text[];
```

## 

### Create silence of 0.8 second

``` bash
ffmpeg -f lavfi -i anullsrc=r=24000:cl=mono -t 0.8 -q:a 9 -acodec libmp3lame silence.mp3
```