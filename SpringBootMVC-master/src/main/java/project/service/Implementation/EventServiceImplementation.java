package project.service.Implementation;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import project.persistence.entities.Event;
import project.persistence.entities.User;
import project.persistence.repositories.EventRepository;
import project.service.EventService;

import java.util.Date;
import java.util.List;

@Service
public class EventServiceImplementation implements EventService {

    // Instance Variables
    EventRepository repository;

    // Dependency Injection
    @Autowired
    public EventServiceImplementation(EventRepository repository) {
        this.repository = repository;
    }

    @Override
    public Event save(User user, Event event) {
        return null;
    }

    @Override
    public void delete(Event event) {

    }

    @Override
    public List<Event> findByDate(User user, Date startDate, Date endDate) {
        return null;
    }

    @Override
    public Event findOne(Long id) {
        return null;
    }

    @Override
    public Event updateEvent(Event event) {
        return null;
    }
}
